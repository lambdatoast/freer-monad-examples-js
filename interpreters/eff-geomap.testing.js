
function runEffGeoMap/*::<a>*/(emd /*: EffGeoMap<a> */) {
  return function (map) {
    if (emd.kind === "fpure") {
      return emd.value;
    } else {
      var r = unEffGeoMap(emd.gx)(map);
      return runEffGeoMap(emd.f(r))(r);
    }
  }
}

function unEffGeoMap/*::<a>*/(md /*: GeoMap<a>*/) {
  return function (map) {
    if (md.kind === 'AddMarker') {
      return map.concat([{ id: map.length, name: md.a}]);
    } else if (md.kind === 'RemoveMarker') {
      return map.filter(function (m) { return m.name !== md.a; });
    }
  }
}

module.exports = runEffGeoMap;
