(function() {
  if (typeof debugMetadata === 'undefined') {
    normalSetup();
  } else {
    debugSetup();
  }

  var Elm = {};
  Elm['Main'] = Elm['Main'] || {};
  if (typeof _user$project$Main$main !== 'undefined') {
      _user$project$Main$main(Elm['Something'], 'Is Wrong', {});
  }
}).call(this);