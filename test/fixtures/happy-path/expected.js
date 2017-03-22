(function() {
  var shouldBeUnwrapped = {},
    shouldBeUnwrapped$iife_private$innerVar = 1,
    shouldBeUnwrapped$iife_private$exposedVar = 2,
    shouldBeUnwrapped$iife_public$exposedFunction = shouldBeUnwrapped$iife_private$exposedFunction,
    shouldBeUnwrapped$iife_public$exposedVar = shouldBeUnwrapped$iife_private$exposedVar,
    shouldBeUnwrapped$iife_public$wrappedFunction = /*#__PURE__*/ F2(
      shouldBeUnwrapped$iife_private$innerFunction
    ),
    shouldBeUnwrapped$iife_public$wrappedVar = shouldBeUnwrapped$iife_private$innerVar +
      1;

  function shouldBeUnwrapped$iife_private$exposedFunction() {}

  function shouldBeUnwrapped$iife_private$innerFunction() {}
  var referenceToWrapped = shouldBeUnwrapped$iife_public$exposedVar;

  var Elm = {};
}.call(this));