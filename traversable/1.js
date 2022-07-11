import { lift2 } from "../apply/liftN.js";
import Maybe from "../daggy/maybe.js";
const { Nothing, Just } = Maybe;

const append = (x) => (xs) => xs.concat([x]);

Array.prototype.traverse = function (T, f) {
  return this.reduce((acc, x) => lift2(append)(f(x))(acc), T.of([]));
};

Array.prototype.sequence = function (T) {
  return this.traverse(T, (x) => x);
};

const toChar = (n) =>
  n < 0 || n > 25 ? Nothing : Just(String.fromCharCode(n + 65));

const res = [1, 2, 3, 4, 5].traverse(Maybe, toChar);
console.log(res);

const res2 = [-1, 2, 3, 4, 5].traverse(Maybe, toChar);
console.log(res2.is(Nothing));
