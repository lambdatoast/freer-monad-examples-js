
function runEffMapDrawing/*::<a>*/(emd /*: EffMapDrawing<a> */) {
  return function (map) {
    if (emd.kind === "fpure") {
      return emd.value;
    } else {
      var r = unEffMapDrawing(emd.gx)(map);
      return runEffMapDrawing(emd.f(r))(r);
    }
  }
}

function unEffMapDrawing/*::<a>*/(md /*: MapDrawing<a>*/) {
  return function (map) {
    if (md.kind === 'AddMarker') {
      return map.concat([{ id: map.length, name: md.a}]);
    } else if (md.kind === 'RemoveMarker') {
      return map.filter(function (m) { return m.name !== md.a; });
    }
  }
}

module.exports = runEffMapDrawing;
