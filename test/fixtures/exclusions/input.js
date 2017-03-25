(function() {

  var skipWithArgs = function(foo) {
    return {fooSquared: foo * foo};
  }();

  var skipWithInvalidChildren1 = function() {
    alert('WAT');
  }();

  var skipWithInvalidChildren2 = function() {
    var result = {};
    if ('rainbows' && 'unicorns') {
      result = {rainbows: true, unicorns: true};
    }

    return {result: result}
  }();

  var skipWithInvalidChildren3 = function() {
    return "I'm not Native!";
  }();

  skipIifesThatArentVarDecs = function() {
    return {foo: 1};
  }();

  var skipEmptyIifes = function() {}();

  var Elm = {};

}).call(this);

(function() {
  var foo = A2('bar');
  var Elm = 'this is some weird imposter Elm IIFE';
}).call(this);

var skipOutsideElmIife = function() {
  return {exposed: 1};
}();