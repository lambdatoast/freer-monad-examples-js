/**
 * @flow
 */

/*:: type FFree<a,gx> = 
       { kind: "fpure", value: a, map: Function, chain: Function } |
       { kind: "fimpure", gx: gx, f: Function, map: Function, chain: Function }
 */

function fpure/*::<a,gx>*/(a /*: a*/) /*: FFree<a,gx> */ { 
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

function fimpure/*::<gx,a>*/(gx /*: gx */) /*: (f: Function) => FFree<a, gx> */ { 
  return function (f) { 
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

function etaF/*::<a,gx>*/(fa /*: gx */) /*: FFree<a,gx> */ {
  return fimpure(fa)(fpure);
}

module.exports = {
  fpure: fpure,
  fimpure: fimpure,
  etaF: etaF
};
