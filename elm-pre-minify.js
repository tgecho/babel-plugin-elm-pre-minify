

const PURE_FUNC_NAMES = new Set([
    "F2","F3","F4","F5","F6","F7","F8","F9",
    "A2","A3","A4","A5","A6","A7","A8","A9",
    "_elm_lang$core$Dict$RBEmpty_elm_builtin",
    "_elm_lang$core$Native_Json$decodePrimitive",
    "_elm_lang$core$Native_Utils$chr",
    "_elm_lang$core$Native_Utils$update",
    "_elm_lang$core$Platform_Cmd$batch",
    "_elm_lang$dom$Native_Dom$iife_public$on",
    "_elm_lang$html$Html$node",
    "_elm_lang$html$Html_Keyed$node",
    "_elm_lang$virtual_dom$Native_VirtualDom$iife_public$makeProgram",
]);

function isElmIife(path) {
    const body = path.node.body.body;
    for (var bi = body.length - 1; bi >= 0; bi--) {
        if (body[bi].type === 'VariableDeclaration') {
            const declarations = body[bi].declarations;
            for (let di = 0; di < declarations.length; di++) {
                const dec = declarations[di];
                if (dec.id.name === 'Elm' && dec.init.type === 'ObjectExpression' && dec.init.properties.length === 0) {
                    return true;
                }
            }
        }
    }

    return false;
}

function isEligibleIife(path) {
    if (path.parent.type !== 'CallExpression' || path.parentPath.parent.type !== 'VariableDeclarator') {
        return false;
    }

    if (path.node.params.length > 0) {
        return false;
    }

    const children = path.node.body.body;

    if (!children || children.length === 0) {
        return false
    }

    for (var i = 0; i < children.length - 1; i++) {
        const s = children[i];
        if (!(s.type === 'VariableDeclaration' || s.type === 'FunctionDeclaration')) {
            return false;
        }
    }

    const last = children[children.length - 1];
    if (!(last.type === 'ReturnStatement' && last.argument.type === 'ObjectExpression')) {
        return false
    }

    return true;
}

module.exports = function({types: t}) {
    return {
        visitor: {
            CallExpression(path, state) {
                const name = path.node.callee.name;

                if (PURE_FUNC_NAMES.has(name) && !path.node.leadingComments) {
                    path.node.leadingComments = [{type: 'BlockStatement', value: '#__PURE__'}];
                }
            },
            FunctionExpression: {
                enter(path, state) {
                    if (!this._insideElmIife && isElmIife(path)) {
                        this._insideElmIife = true;
                        path._isElmIife = true;
                    }
                },
                exit(path, state) {
                    if (this._insideElmIife) {
                        if (path._isElmIife) {
                            this._insideElmIife = false;
                            return;
                        }
                    } else {
                        return;
                    }

                    if (!isEligibleIife(path)) {
                        return;
                    }

                    const declaratorPath = path.parentPath.parentPath;
                    const declarationPath = declaratorPath.parentPath;
                    const rootPath = declarationPath.parentPath;
                    const prefix = declaratorPath.node.id.name;
                    const bodyPath = path.get('body');

                    function rename(name) {
                        bodyPath.scope.rename(name, `${prefix}$iife_private$${name}`);
                    }

                    const declarators = [
                        //_elm_lang$core$Native_Basics requires the empty iife
                        // created object to stick around due to some compiler
                        // trickery with Basics operators
                        t.variableDeclarator(
                            t.identifier(prefix),
                            t.objectExpression([])
                        ),
                    ];
                    const functions = [];
                    const keys = {};

                    bodyPath.node.body.forEach((statement, index) => {
                        const innerPath = bodyPath.get(`body.${index}`);

                        switch (statement.type) {
                            case 'VariableDeclaration':
                                statement.declarations.forEach(declarator => {
                                    rename(declarator.id.name);
                                    declarators.push(declarator);
                                });
                                break;

                            case 'FunctionDeclaration':
                                rename(statement.id.name);
                                declarationPath.insertAfter(statement);
                                break;

                            case 'ReturnStatement':
                                if (innerPath.get('argument').isObjectExpression()) {
                                    statement.argument.properties.forEach(prop => {
                                        const id = t.identifier(`${prefix}$iife_public$${prop.key.name}`);
                                        declarators.push(t.variableDeclarator(id, prop.value));
                                        keys[prop.key.name] = id;
                                    });
                                }
                                break;
                        }
                    });

                    rootPath.scope.bindings[prefix].referencePaths.forEach(ref => {
                        const sub = ref.isIdentifier() && keys[ref.parent.property.name];
                        if (sub) {
                            ref.parentPath.replaceWith(sub)
                        }
                    });

                    declaratorPath.replaceWithMultiple(declarators);
                }
            },
        },
    };
}