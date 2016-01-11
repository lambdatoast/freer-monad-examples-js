/**
 * @flow
 */

var R = require('ramda');
var FFree = require('./ffree');
var etaF = FFree.etaF;
var fpure = FFree.fpure;
var fimpure = FFree.fimpure;

/*:: type MapDrawing<a> = 
       { kind: "AddMarker", value: a} |
       { kind: "RemoveMarker", value: a}
 */

/*:: type EffMapDrawing<a> = FFree<MapDrawing<a>> */

function AddMarker(a) { return { kind: "AddMarker", a: a }; }
function RemoveMarker(a) { return { kind: "RemoveMarker", a: a }; }

var addMarker = R.compose(etaF,AddMarker);
var removeMarker = R.compose(etaF,RemoveMarker);

module.exports = {
  addMarker: addMarker,
  removeMarker: removeMarker
}
