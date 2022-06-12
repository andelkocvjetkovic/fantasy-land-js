import daggy from "daggy";
import { Coord } from "../daggy/0.mjs";
import { nub_ } from "./4.js";
import { notEquals } from "./3.js";

const Set = daggy.tagged("Set", ["xs"]);

// add :: Setoid x => Set x ~> x -> Set x
Set.prototype.add = function (x) {
  return Set(nub_([...this.xs, x]));
};
// remove :: Setoid x => Set x ~> x -> Set x
Set.prototype.remove = function (x) {
  return Set(this.xs.filter((y) => notEquals(y)(x)));
};

const res = Set([Coord(1, 2, 3), Coord(1, 2, 3)])
  .add(Coord(2, 3, 4))
  .add(Coord(1, 2, 3))
  .remove(Coord(1, 2, 3))
  .remove(Coord(2, 3, 4));
console.log(res.toString());
