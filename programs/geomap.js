var addMarker = require('../eff-geomap').addMarker; 
var removeMarker = require('../eff-geomap').removeMarker; 
var hasMarker = require('../eff-geomap').hasMarker; 
var getMarkers = require('../eff-geomap').getMarkers; 

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
  addMarker('antarctica'),
  addMarker('serbia'),
  addMarker('russia'),
  removeMarker('antarctica'),
  hasMarker('serbia').chain(function (answer) {
    return !answer ? removeMarker('serbia') : fromList([
      addMarker('belgium')
    ])
  }),
  getMarkers
]);
