import Identity from "../functor/Identity.js";
import { lift2 } from "./0.js";

const add = (x) => (y) => x + y;

const mul = (x) => (y) => x * y;

const res = lift2(add)(Identity(4))(Identity(3));

const res2 = Identity(4).ap(Identity(2).map(add));

console.log(res);
