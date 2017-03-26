# babel-plugin-elm-pre-minify

A **VERY EXPERIMENTAL** Babel plugin that prepares Elm compiled Javascript for optimal minification

## Summary

Elm's functional, side effect free nature makes it theoretically easy to perform dead code elimination. In practice, however, the way certain parts are structured make it hard for general static minifiers to perform effectively. By using domain specific knowledge, we can transform the code to make it easier to minify without changing how it functions.

**Reminder:** This is highly experimental and is **very** likely to break your app. Please test and report back with your results.


## Usage


### Setup

Install with `npm install --save babel-plugin-elm-pre-minify` (or ideally `yarn add babel-plugin-elm-pre-minify`).

You'll need Babel: [Babel Setup Docs](https://babeljs.io/docs/setup/)

Add the plugin to your Babel config (e.g. .babelrc)

```json
{
	"plugins": ["elm-pre-minify"]
}
```

### Minifying

Run your minifier on the output file as before. I've only tested it with UglifyJS and Closure, and Uglify gives the best results by far. Explicitly setting the pure_getters option will hopefully be unnecessary in the future as it may not be safe on JS code outside of the Elm scope.

For example:

```sh
uglifyjs path/to/babel/compiled.js --compress --mangle --output path/to/final.js
```


## What It Does

### Native Modules IIFE Unwrapping

Native modules are typically written as an Immediately Invoked Function Expression (IIFE) that returns a collection. Dead code elimination typically can't operate on any of these inner functions.


```
var shouldBeUnwrapped = function() {
	return {
		exposedFunction: function() {}
	};
}();

var referenceToWrappedFunction = shouldBeUnwrapped.exposedFunction;
```

In cases where an IIFE appears safe to unwrap, we can hoist all of the inner variables and function declarations up to the higher scope and remove the IIFE. References that touched the returned object are rewritten to point directly at the exposed identifier. Dead code elimination can then much more easily operate on all of unwrapped values.


```
var shouldBeUnwrapped = {},
	shouldBeUnwrapped$iife_public$exposedFunction = function() {};

var referenceToWrappedFunction = shouldBeUnwrapped$iife_public$exposedFunction;
```

### Pure function annotation

Minifiers tend to be very conservative about whether or not a function has potential side effects. If a variable is unused, but a function was called as part of its initialization, the dead code eliminator will tend to skip that variable. In Elm, helper functions such as `F2` and `A2` are used extensively for various reasons. They are in fact pure and side effect free (despite their internal use of mutation).

Some minifiers (at least [UglifyJS](https://github.com/mishoo/UglifyJS2/pull/1448)) are beginning to support a special comment based annotation, so we add this comment to any function call expressions matching a whitelist of names. This allows much more aggressive dead code elimination to take place.

```
var potentiallyUnusedVar = F2(someFunc);
```

Becomes

```
var potentiallyUnusedVar = /* #__PURE__ */F2(someFunc);
```


## Effectiveness

Testing has been limited, but highly encouraging so far. Real world data is lacking, but so far I haven't noticed any malfunctions caused by the transformed code. Your results may vary, so please report an issue if you see otherwise!

Recorded improvements over running uglifyjs alone range from 25-60%. Recent recordings can be found in the [examples directory](examples/results.md).
