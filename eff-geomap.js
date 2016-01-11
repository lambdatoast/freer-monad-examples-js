/**
 * @flow
 */

var R = require('ramda');
var FFree = require('./ffree');
var etaF = FFree.etaF;
var fpure = FFree.fpure;
var fimpure = FFree.fimpure;

/*:: type GeoMap<a> = 
       { kind: "AddMarker", value: a} |
       { kind: "RemoveMarker", value: a}
 */

/*:: type EffGeoMap<a> = FFree<GeoMap<a>> */

function AddMarker(a) { return { kind: "AddMarker", a: a }; }
function RemoveMarker(a) { return { kind: "RemoveMarker", a: a }; }

var addMarker = R.compose(etaF,AddMarker);
var removeMarker = R.compose(etaF,RemoveMarker);

module.exports = {
  addMarker: addMarker,
  removeMarker: removeMarker
}
