/**
 * @flow
 */

// http://okmij.org/ftp/Computation/free-monad.html

var R = require('ramda');
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

var getFF = etaF(get);
var putFF = R.compose(etaF,put);

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

