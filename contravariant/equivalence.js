import daggy from "daggy";
import { Coord } from "../daggy/0.mjs";
const Equivalence = daggy.tagged("Equivalence", ["f"]);

Equivalence.prototype.contramap = function (g) {
  return Equivalence((x, y) => this.f(g(x), g(y)));
};

Equivalence.prototype.empty = () => Equivalence((x, y) => true);

Equivalence.prototype.concat = function (that) {
  return Equivalence((x, y) => this.f(x, y) && that.f(x, y));
};

const searchCheck = Equivalence((x, y) => Object.is(x, y))
  .contramap((x) => x.replace(/\W+/, ""))
  .contramap((x) => x.toLowerCase());

const res1 = searchCheck.f("Hello", "HEllO!"); // true
const res2 = searchCheck.f("world", "werld"); // false

//console.log("res1:", res1);
//console.log("res2:", res2);

const coordChecker = Equivalence((x, y) => x.equals(y)).contramap((c) =>
  c.translate(1, 2, 3)
);

const coordOne = Coord(1, 2, 3);
const coordTwo = Coord(1, 2, 3);

const res3 = coordChecker.f(coordOne, coordTwo);

//console.log("res3:", res3);
export { Equivalence };
