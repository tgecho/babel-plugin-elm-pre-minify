(function() {

    var shouldBeUnwrapped = function() {
        return {foo: 1};
    }();

    var referencesSomethingStrange = shouldBeUnwrapped.doesntExist;
    var wantsToBeIife = shouldBeUnwrapped;
    var dontKnowWhatImDoing = wantsToBeIife.foo;

    var Elm = {};

}).call(this);
