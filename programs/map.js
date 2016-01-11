var addMarker = require('../eff-map').addMarker; 
var removeMarker = require('../eff-map').removeMarker; 

module.exports = addMarker('antarctica').chain(function () {
  return addMarker('serbia').chain(function () {
    return addMarker('russia').chain(function () {
      return removeMarker('antarctica');
    });
  });
});
