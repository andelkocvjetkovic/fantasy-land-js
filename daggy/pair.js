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

Pair.prototype.traverse = function (_, f) {
  return f(this.y).map((x) => Pair(this.x, x));
};

Pair.prototype.chain = function (f) {
  const that = f(this.y);
  return Pair(this.x.concat(that.x), that.y);
};

export default Pair;
