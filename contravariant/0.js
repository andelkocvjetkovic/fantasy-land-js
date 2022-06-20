import daggy from "daggy";
const Predicate = daggy.tagged("Predicate", ["f"]);

Predicate.prototype.contramap = function (f) {
  return Predicate((x) => this.f(f(x)));
};

Predicate.prototype.empty = () => Predicate((x) => true);

Predicate.prototype.concat = function (that) {
  return Predicate((x) => this.f(x) && that.f(x));
};

const isEven = Predicate((x) => x % 2 === 0);

const isLengthEven = isEven.contramap((x) => x.length);

console.log(isLengthEven.f("andelko"));
