(function() {

	var shouldBeUnwrapped = function() {
		return {};
	}();

	var referencesSomethingStrange = shouldBeUnwrapped.doesntExist;

	var Elm = {};

}).call(this);
