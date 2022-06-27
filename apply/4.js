import Identity from "../functor/Identity.js";

//laws
const compose2 = (f) => (g) => (x) => f(g(x));

const x = Identity(3);
const g = Identity((x) => x + 1);
const f = Identity((x) => x * 2);

const composLaw =
  x.ap(g.ap(f.map(compose2))).toString() === x.ap(g).ap(f).toString();

console.log(x.ap(g).ap(f).toString());
