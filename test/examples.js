import test from 'ava';
import * as babel from 'babel-core';
import elmPreMinify from '../elm-pre-minify';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const examples = path.join(__dirname, '../test/fixtures');

for (let dir of fs.readdirSync(examples)) {
	if (fs.lstatSync(path.join(examples, dir)).isDirectory()) {
		test(dir, t => {
			const inputJs = fs.readFileSync(path.join(examples, dir, 'input.js'), 'utf8');
			const expectedJs = fs.readFileSync(path.join(examples, dir, 'expected.js'), 'utf8');

			const transformed = prettier.format(babel.transform(inputJs, {
				plugins: [elmPreMinify],
			}).code);

			const expected = prettier.format(expectedJs);

			t.true(transformed === expected);
		});
	}
}