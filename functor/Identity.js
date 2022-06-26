import daggy from "daggy";
import { compose, id, add2, mul3 } from "./0.js";
const Identity = daggy.tagged("Identity", ["x"]);

// map :: Identity a ~> (a -> b) -> Identity b
Identity.prototype.map = function (f) {
  return Identity(f(this.x));
};

// fold :: Identity a ~> (a -> b) -> b
Identity.prototype.fold = function (f) {
  return f(this.x);
};

Identity.toString = function () {
  return `Identity(${this.x})`;
};

// ap :: Identity a ~> Identity (a -> b) -> Identity b
Identity.prototype.ap = function (b) {
  return b.map((f) => f(this.x));
};

const X = 42;

//IdLaw
const idLaw1 = Identity(X).map(id);
const idLaw2 = Identity(id(X));
const idLaw3 = Identity(X);

//console.log("Id laws:");
//console.log(idLaw1.toString(), idLaw2.toString(), idLaw3.toString(), "\n");

//composLaw
const composLaw1 = Identity(X).map(add2).map(mul3);
const composeLaw2 = Identity(X).map(compose(mul3, add2));

// console.log("Compose laws:");
// console.log(composLaw1.toString(), composeLaw2.toString(), "\n");

export default Identity;
