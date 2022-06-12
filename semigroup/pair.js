import daggy from "daggy";
import { Max, Any } from "./1.js";

const Tuple = daggy.tagged("Tuple", ["x", "y"]);

//concat :: (Semigroup a,Semigroup b) => Tuple a b ~> Tuple a b -> Tuple a b
Tuple.prototype.concat = function (that) {
  return Tuple(this.x.concat(that.x), this.y.concat(that.y));
};

const res = Tuple(Max(1), Any(true)).concat(Tuple(Max(4), Any(false)));
console.log(res.toString());
