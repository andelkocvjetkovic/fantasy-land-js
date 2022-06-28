import Identity from "../functor/Identity.js";
// Applicative laws
//
const v = Identity.of(4);
const identityLaw = v.ap(Identity.of((x) => x)).toString() === v.toString();
console.log(identityLaw);

const x = 5;
const f = (x) => x + 2;
const homomorphismLaw =
  Identity.of(x).ap(Identity.of(f)).toString() === Identity.of(f(x)).toString();
console.log(homomorphismLaw);

const y = 4;
const u = Identity.of((x) => x + 3);
const interchangeLaw =
  Identity.of(y).ap(u).toString() === u.ap(Identity.of((f) => f(y))).toString();
console.log(interchangeLaw);
