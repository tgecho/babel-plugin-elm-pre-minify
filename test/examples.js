import test from 'ava';
import * as babel from 'babel-core';
import elmPreMinify from '../elm-pre-minify';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const examples = path.join(__dirname, '../test/fixtures');

function testExample(name, babelOptions = {plugins: [elmPreMinify]}) {
	test(`Example: ${name}`, t => {
		const inputJs = fs.readFileSync(path.join(examples, name, 'input.js'), 'utf8');
		const expectedJs = fs.readFileSync(path.join(examples, name, 'expected.js'), 'utf8');

		const transformed = prettier.format(babel.transform(inputJs, babelOptions).code);
		const expected = prettier.format(expectedJs);

		t.true(transformed === expected);
	});
}

testExample('happy-path');
testExample('exclusions');
testExample('pure-annotations-off', {plugins: [[elmPreMinify, {
	pureAnnotations: false
}]]});
testExample('iife-unwrapping-off', {plugins: [[elmPreMinify, {
	iifeUnwrapping: false
}]]});