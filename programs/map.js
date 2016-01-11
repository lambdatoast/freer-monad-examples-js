var addMarker = require('../eff-map').addMarker; 

module.exports = addMarker('antarctica').chain(function () {
  return addMarker('serbia').chain(function () {
    return addMarker('russia');
  });
});
