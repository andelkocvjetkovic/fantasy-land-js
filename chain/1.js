import Pair from "../daggy/Pair.js";
import { range } from "./range.js";
// chain :: Array a ~> (a -> Array b) -> Array b
Array.prototype.chain = function (f) {
  return [].concat(...this.map(f));
};

const flights = {
  ATL: ["LAX", "DFW"],
  ORD: ["DEN"],
  LAX: ["JFK", "ATL"],
  DEN: ["ATL", "ORD", "DFW"],
  JFK: ["LAX", "DEN"],
};

const whereNext = (x) => flights[x] || [];

whereNext("LAX") // JFK, ATL
  .chain(whereNext) // LAX, DEN, LAX, DFW
  .chain(whereNext); // JFK, ATL, ATL, ORD, DFW, JFK, ATL

// prettier-ignore
// factors :: Int -> [Pair Int Int]
const factors = (n) =>
  range(1, n).chain((a) =>
    range(1, a).chain((b) => 
      (a * b !== n ? [] : [Pair(a, b)]))
  );

console.log(factors(20));
