import daggy from "daggy";
const Comparison = daggy.tagged("Comparison", ["f"]);

Comparison.prototype.contramap = function (g) {
  return Comparison((x, y) => this.f(g(x), g(y)));
};

const compereInts = Comparison((x, y) =>
  x > y ? 1 : x < y ? -1 : 0
).contramap((x) => (isNaN(x) ? -Infinity : x));

const res = [4, 5, 1, 3, "andelko", "!", 12].sort(compereInts.f);
console.log(res);
