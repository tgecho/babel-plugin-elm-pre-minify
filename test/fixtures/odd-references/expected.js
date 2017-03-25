(function() {
  var shouldBeUnwrapped = {},
  shouldBeUnwrapped$iife_public$foo = 1;
  
  var referencesSomethingStrange = shouldBeUnwrapped.doesntExist;
  var wantsToBeIife = shouldBeUnwrapped;
  var dontKnowWhatImDoing = shouldBeUnwrapped$iife_public$foo;

  var Elm = {};

}).call(this);
