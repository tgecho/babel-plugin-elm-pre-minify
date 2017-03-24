(function() {

  var shouldNotBeUnwrapped = function() {

    function innerFunction() {}

    return {
      wrappedFunction: /*#__PURE__*/F2(innerFunction),
    };

  }();
  
  var referenceToWrapped = shouldNotBeUnwrapped.wrappedFunction;

  var Elm = {};

}).call(this);
