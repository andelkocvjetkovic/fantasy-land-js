import Maybe from "../daggy/Maybe.js";

const { Just, Nothing } = Maybe;

// Distributivity
const x = Just(4);
const f = Maybe.of((x) => x + 2);
const g = Nothing;

const distributivity =
  x.ap(f.alt(g)).toString() === x.ap(f).alt(x.ap(g)).toString();
console.log(distributivity);

// Annihilation
const annihilation = x.ap(Maybe.zero()).toString() === Maybe.zero().toString();
console.log(annihilation);
