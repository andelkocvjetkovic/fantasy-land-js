import Identity from "../functor/Identity.js";
// of :: Applicative f => a -> f a
//
const idLaw =
  Identity(4)
    .ap(Identity.of((x) => x))
    .toString() === Identity(4).toString();

console.log(idLaw);

const add2 = (x) => x + 2;
const homomorphism =
  Identity(4).ap(Identity.of(add2)).toString() ===
  Identity.of(add2(4)).toString();

console.log(homomorphism);
const u = Identity.of(add2);
const interchange =
  Identity.of(5).ap(u).toString() === u.ap(Identity.of((f) => f(5))).toString();

console.log(interchange);
