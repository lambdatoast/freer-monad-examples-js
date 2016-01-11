var runEffMapDrawing = require('../interpreters/eff-map.testing');
var p1 = require('../programs/map');

var r = runEffMapDrawing(p1)([]);

console.log(r);
