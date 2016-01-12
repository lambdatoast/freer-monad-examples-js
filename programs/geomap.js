var EGM = require('../languages/eff-geomap');
var addMarker = EGM.addMarker; 
var removeMarker = EGM.removeMarker; 
var hasMarker = EGM.hasMarker; 
var getMarkers = EGM.getMarkers; 

// Verbose syntax. see fromList()-using version below:
var p = addMarker('antarctica').chain(function () {
  return addMarker('serbia').chain(function () {
    return addMarker('russia').chain(function () {
      return removeMarker('antarctica').chain(function (z) {
        return hasMarker('serbia').chain(function (x) {
          return removeMarker('serbia');
        })
      });
    });
  });
});

function fromList(xs) {
  return xs.slice(1).reduce(function (r, x) {
    return r.chain(function () { return x; });
  }, xs[0]);
}

module.exports = fromList([
  addMarker('france'),
  addMarker('serbia'),
  addMarker('russia'),
  removeMarker('france'),
  hasMarker('serbia').chain(function (answer) {
    return !answer ? removeMarker('serbia') : fromList([
      addMarker('belgium'),
      addMarker('austria')
    ])
  }),
  getMarkers
]);
