/**
 * @flow
 */

var R = require('ramda');
var FFree = require('./ffree');
var etaF = FFree.etaF;
var fpure = FFree.fpure;
var fimpure = FFree.fimpure;

/*:: type StateEff<s,x> = 
       { kind: "Get" } |
       { kind: "Put", s: s}
 */

/*:: type EffState<s,x> = FFree<StateEff<s,*>> */

var Get = { kind: "Get" };
function Put(s) { return { kind: "Put", s: s }; }

var getEff = etaF(Get);
var putEff = R.compose(etaF,Put);

function runEffState/*::<s,a>*/(es /*: EffState<s,a> */) {
  return function (s) {
    if (es.kind === "fpure") {
      return [ es.value, s ];
    } else {
      var r = unEffState(es.gx)(s), x = r[0], s_ = r[1];
      return runEffState(es.f(x))(s_);
    }
  }
}

function unEffState/*::<s,a>*/(sf /*: StateEff<s,a>*/) {
  return function (s) {
    if (sf.kind === 'Get') {
      return [s, s];
    } else {
      return [undefined, sf.s];
    }
  }
}


var p2 = putEff('putEff').chain(function() {
  return getEff.chain(function (x) {
    return putEff(x + '!!!!!');
  });
});

var r2 = runEffState(p2)([12321]);
//console.log(r2);
