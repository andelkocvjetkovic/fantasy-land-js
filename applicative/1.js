import Maybe from "../daggy/maybe.js";
const { Just, Nothing } = Maybe;
// append :: a -> [a] -> [a]
const append = (x) => (xs) => xs.concat([x]);

// lift2 :: ((a -> b -> c),f a, f b) -> f c
const lift2 = (f, a, b) => b.ap(a.map(f));

// insideOut :: Applicative f => [f a] -> f [a]
const insideOut = (T, xs) =>
  xs.reduce((acc, x) => lift2(append, x, acc), T.of([]));

const res = insideOut(Maybe, [Just(2), Just(4), Just(6)]);
console.log(res);
const res2 = insideOut(Maybe, [Just(2), Nothing, Just(6)]);
console.log(res2.is(Nothing));

const res3 = Maybe.of(Nothing).concat(Just([1, 3, 4]));
console.log(res3);
