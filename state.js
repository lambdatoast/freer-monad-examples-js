/**
 * @flow
 */

// http://okmij.org/ftp/Computation/free-monad.html

var FFree = require('./ffree');
var etaF = FFree.etaF;
var fpure = FFree.fpure;
var fimpure = FFree.fimpure;

/*:: type State<s,a> = { unState: (s: s) => [a, s]; } */

function state/*::<s,a>*/(f /*: (s: s) => [a, s] */) /*: State<s,a>*/ {
  return { unState: f };
}

var get = state(function (s) { return [s, s]; });

function put(s) {
  return state(function (_) { return [undefined, s]; });
}

function runState/*::<s,a>*/(st /*: State<s,a>*/) { 
  return function (s) { 
    return st.unState(s); 
  } 
}

function compose(g) { 
  return function (f) { 
    return function (x) { return g(f(x)); }
  };
}

var getFF = etaF(get);
var putFF = compose(etaF)(put);

function runFFState/*::<a>*/(fs /*: FFree<a> */) {
  return function (s) {
    if (fs.kind === "fpure") {
      return [fs.value, s];
    } else {
      var r = fs.gx.unState(s), x = r[0], s_ = r[1];
      return runFFState(fs.f(x))(s_);
    }
  }
}

/*
loadUser(2).chain(function (u) {
  return u.name;
});

putUser(2).chain(function (_) {
  return loadUser(2).chain(function (u) {
    return u.name:
  });
});

do
  putUser(2)
  u <- getUser(2)
  return u.name
*/

var p1 = putFF(10).chain(function() {
  return getFF.chain(function (x) {
    return putFF(x * x);
  });
});

var r1 = runFFState(p1)([12321]);
//console.log(r1);

// The real deal:

/*:: type StateEff<s,x> = 
       { kind: "Get" } |
       { kind: "Put", s: s}
 */

/*:: type EffState<s,x> = FFree<StateEff<s,*>> */

var Get = { kind: "Get" };
function Put(s) { return { kind: "Put", s: s }; }

var getEff = etaF(Get);
var putEff = compose(etaF)(Put);

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


var p2 = putEff('yeah').chain(function() {
  return getEff.chain(function (x) {
    return putEff(x + '!!!!!');
  });
});

var r2 = runEffState(p2)([12321]);
console.log(r2);
