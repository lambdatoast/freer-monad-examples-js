var addMarker = require('../eff-geomap').addMarker; 
var removeMarker = require('../eff-geomap').removeMarker; 

module.exports = addMarker('antarctica').chain(function () {
  return addMarker('serbia').chain(function () {
    return addMarker('russia').chain(function () {
      return removeMarker('antarctica');
    });
  });
});
