import { lift2 } from "./0.js";
// ap : Array a ~> Array (a -> b) -> Array b
Array.prototype.ap = function (b) {
  return [].concat(...b.map((f) => this.map(f)));
};

const res1 = [1, 2, 3].ap([]);
console.log(res1);

const res2 = [1, 2, 3].ap([(x) => x + 1]);
console.log(res2);

const res3 = [1, 2, 3].ap([(x) => x + 1, (x) => x * 5]);
console.log(res3);

const res4 = lift2((x) => (y) => x * y)([1, 2, 3])([4, 5]);
console.log(res4);
