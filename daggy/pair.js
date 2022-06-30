import daggy from "daggy";
const Pair = daggy.tagged("Pair", ["x", "y"]);

// map :: Pair l r ~> (r -> s) -> Pair l s
Pair.prototype.map = function (f) {
  return Pair(this.x, f(this.y));
};

// ap :: Pair l r ~> Pair l (r -> s) -> Pair l s
Pair.prototype.ap = function (that) {
  return Pair(this.x, that.y(this.y));
};

export default Pair;