/**
 * @flow
 */

/*:: type FFree<a> = 
       { kind: "fpure", value: a, map: Function, chain: Function } |
       { kind: "fimpure", gx: Object, f: Function, map: Function, chain: Function }
 */

function fpure/*::<a>*/(a /*: a*/) /*: FFree<a> */ { 
  return { 
    value: a,
    // Functor
    map: function (f) { return fpure(f(a)); },
    // Monad
    chain: function (k) { return k(a); },
    // Ugh
    kind: 'fpure'
  } 
}

function fimpure(gx) { 
  return function (f /*: Function */) { 
    return { 
      gx: gx, 
      f: f,
      // Functor
      map: function (f_) { 
        return fimpure(gx)(function (x) {
          return f(x).map(f_);
        });
      },
      // Monad
      // FImpure gx f >>= k = FImpure gx (f >>> k)
      chain: function (k) {
        return fimpure(gx)(kompose(f)(k));
      },
      // Ugh
      kind: 'fimpure'
    }; 
  } 
}

// (>>>) :: Monad m => (a -> m b) -> (b -> m c) -> (a -> m c)
// f >>> g = (>>= g) . f
function kompose(f) {
  return function (g) {
    return function (a) { 
      return f(a).chain(g);
    };
  };
}

function etaF/*::<a>*/(fa) /*: FFree<a> */ {
  return fimpure(fa)(fpure);
}

module.exports = {
  fpure: fpure,
  fimpure: fimpure,
  etaF: etaF
};
