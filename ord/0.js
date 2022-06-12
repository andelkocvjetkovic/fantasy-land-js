import { List } from "../daggy/list.mjs";
//lte :: Ord a => a -> a -> Boolean
const lte = (x) => (y) => x.lte(y);

//gt :: Ord a => a -> a -> Boolean
const gt = (x) => (y) => !lte(x)(y);

//gte :: Ord a => a -> a -> Boolean
const gte = (x) => (y) => gt(x)(y) || x.equals(y);

//gte :: Ord a => a -> a -> Boolean
const lt = (x) => (y) => !gte(x)(y);

//eq :: Setoid a -> a -> a -> Boolean
const eq = (x) => (y) => x.equals(y);

Number.prototype.equals = function (that) {
  return this === that;
};
Number.prototype.lte = function (that) {
  return this <= that;
};

const a = List.from([1, 2]);
const b = List.from([1, 2, 3]);
const c = List.from([1, 2, 3, 4]);
//const a = 1;
//const b = 2;
//const c = 3;
console.log(eq(a)(b));

//laws
//
console.log("\nTotality");
console.log(lte(a)(b) || lte(b)(a) === true);
//a.lte(b) || b.lte(a) === true // Totality

console.log("\nAntisymmetry");
console.log(lte(a)(b) && lte(b)(a) === eq(a)(b));
//a.lte(b) && b.lte(a) === a.equals(b) // Antisymmetry

console.log("\nTransitivity");
console.log(lte(a)(b) && lte(b)(c) === lte(a)(c));
//a.lte(b) && b.lte(c) === a.lte(c) // Transitivity
