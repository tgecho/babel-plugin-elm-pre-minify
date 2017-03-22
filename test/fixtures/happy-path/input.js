(function() {

	var shouldBeUnwrapped = function() {

		function innerFunction() {}
		function exposedFunction() {}

		var innerVar = 1;
		var exposedVar = 2;

		return {
			exposedFunction: exposedFunction,
			exposedVar: exposedVar,
			wrappedFunction: F2(innerFunction),
			wrappedVar: innerVar + 1,
		};

	}();

	var referenceToWrapped = shouldBeUnwrapped.exposedVar;

	var Elm = {};

}).call(this);
