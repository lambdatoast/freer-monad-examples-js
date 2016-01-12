
function runEffGeoMap/*::<a>*/(emd /*: EffGeoMap<a> */) {
  return function (markers) {
    if (emd.kind === "fpure") {
      return emd.value;
    } else {
      var r = unEffGeoMap(emd.gx)(markers);
      return runEffGeoMap(emd.f(r))(r);
    }
  }
}

var markers = [];

function unEffGeoMap/*::<a>*/(md /*: GeoMap<a>*/) {
  return function (r) {
    if (md.kind === 'AddMarker') {
      var m = { id: markers.length, name: md.a};
      markers.push(m);
      return m;
    } else if (md.kind === 'RemoveMarker') {
      var markers_ = markers.filter(function (m) { return m.name !== md.a; });
      var successfulRemoval = markers_.length < markers.length;
      markers = markers_;
      return successfulRemoval;
    } else if (md.kind === 'HasMarker') {
      return markers.some(function (m) { return m.name === md.a; });
    } else if (md.kind === 'GetMarkers') {
      return markers;
    } else {
      throw new Error('Unknown operation: ' + md.kind);
    }
  }
}

module.exports = function (p) {
  return runEffGeoMap(p)(markers);
};
