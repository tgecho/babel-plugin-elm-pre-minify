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

  var Elm = {};

}).call(this);

var skipOutsideElmIife = function() {
  return {exposed: 1};
}();