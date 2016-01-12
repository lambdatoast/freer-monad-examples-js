/**
 * @flow
 */

var R = require('ramda');
var etaF = require('./../ffree').etaF;

/*:: type GeoMap<a> = 
       { kind: "AddMarker", value: a} |
       { kind: "RemoveMarker", value: a}
 */

/*:: type EffGeoMap<a> = FFree<GeoMap<a>> */

function AddMarker(a) { return { kind: "AddMarker", a: a }; }
function RemoveMarker(a) { return { kind: "RemoveMarker", a: a }; }
function HasMarker(a) { return { kind: "HasMarker", a: a }; }
var GetMarkers = { kind: "GetMarkers" };

var addMarker = R.compose(etaF, AddMarker);
var removeMarker = R.compose(etaF, RemoveMarker);
var hasMarker = R.compose(etaF, HasMarker);
var getMarkers = etaF(GetMarkers);

module.exports = {
  addMarker: addMarker,
  removeMarker: removeMarker,
  hasMarker: hasMarker,
  getMarkers: getMarkers
};
