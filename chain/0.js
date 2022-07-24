import Maybe from "../daggy/maybe.js";
// safeProp :: String a -> Object b -> Maybe c
const safeProp = (x) => (xs) => x in xs ? Maybe.Just(xs[x]) : Maybe.Nothing;

const data = { a: { b: { c: 2 } } };
// map :: Functor a => (a -> b) -> f a -> f b
const map = (f) => (xs) => xs.map(f);

// How do we get to the 2?
const res = safeProp("a")(data) // Just({ b: { c: 2 } })
  .map(safeProp("b")) // Just(Just({ c: 2 }))
  .map(map(safeProp("c"))); // Just(Just(Just(2)))

const res2 = safeProp("a")(data) // Just({ b: { c: 2 }})
  .map(safeProp("badger")) // Just(Nothing)
  .map(map(safeProp("c"))); // Just(Nothing)

const res3 = safeProp("a")(data) // Just({ b: { c: 2 } })
  .map(safeProp("b")) // Just(Just({ c: 2 }))
  .join() // Just({ c: 2 })
  .map(safeProp("c")) // Just(Just(2))
  .join(); // Just(2)

const res4 = safeProp("a")(data) // Just({ b: { c: 2 }})
  .map(safeProp("badger")) // Just(Nothing)
  .join() // Nothing
  .map(safeProp("c")) // Nothing(Nothing)
  .join(); // Nothing

const res5 = safeProp("a")(data) // Just({ b: { c: 2 } })
  .chain(safeProp("b")) // Just({ c: 2 })
  .chain(safeProp("c")); // Just(2)

const res6 = safeProp("a")(data) // Just({ b: { c: 2 }})
  .chain(safeProp("badger")) // Nothing
  .chain(safeProp("c")); // Nothing

console.log(res6);
