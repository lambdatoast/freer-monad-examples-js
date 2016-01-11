
function runEffMapDrawing/*::<a>*/(emd /*: EffMapDrawing<a> */) {
  return function (map) {
    if (emd.kind === "fpure") {
      return emd.value;
    } else {
      var r = unEffMapDrawing(emd.gx)(map);
      return runEffMapDrawing(emd.f(r))(map);
    }
  }
}

function unEffMapDrawing/*::<a>*/(md /*: MapDrawing<a>*/) {
  return function (map) {
    if (md.kind === 'AddMarker') {
      map.push('added marker ' + map.length + ' to ' + md.a);
      return map;
    } else if (md.kind === 'RemoveMarker') {
      return map.slice(0, (map.length - 1))
    }
  }
}

module.exports = runEffMapDrawing;
