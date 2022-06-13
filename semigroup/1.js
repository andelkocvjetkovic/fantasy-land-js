import daggy from "daggy";

const Sum = daggy.tagged("Sum", ["val"]);

Sum.prototype.concat = function (that) {
  return Sum(this.val + that.val);
};
Sum.empty = () => Sum(0);

const Product = daggy.tagged("Product", ["val"]);

Product.prototype.concat = function (that) {
  return Product(this.val * that.val);
};
Product.empty = () => Product(1);

const Min = daggy.tagged("Min", ["val"]);

Min.prototype.concat = function (that) {
  return Min(this.val < that.val ? this.val : that.val);
};
Min.empty = () => Min(Infinity);

const Max = daggy.tagged("Max", ["val"]);

Max.prototype.concat = function (that) {
  return Max(this.val > that.val ? this.val : that.val);
};
Max.empty = () => Max(-Infinity);

const Any = daggy.tagged("Any", ["val"]);

Any.prototype.concat = function (that) {
  return Any(this.val || that.val);
};
Any.empty = () => Any(false);

const All = daggy.tagged("All", ["val"]);

All.prototype.concat = function (that) {
  return All(this.val && that.val);
};
All.empty = () => All(true);

export { Sum, Product, Min, Max, Any, All };

const res1 = All(true).concat(All(false).concat(All(false)));
const res2 = All(true).concat(All(false)).concat(All(false));
console.log(res1.toString());
console.log(res2.toString());
console.log(res1.toString() === res2.toString());
