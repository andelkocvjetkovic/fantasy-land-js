import Maybe from "../daggy/Maybe.js";
// alt :: Alt f => f a ~> f a -> f a
//
const { Just, Nothing } = Maybe;
const a = Just(4);
const b = Nothing;
const c = Nothing;
// Associativity
const res = a.alt(b).alt(c).toString() === a.alt(b.alt(c)).toString();
console.log(res);

// Distributivity
const f = (x) => x + 2;
const res2 = a.alt(b).map(f).toString() === a.map(f).alt(b.map(f)).toString();
console.log(res2);
