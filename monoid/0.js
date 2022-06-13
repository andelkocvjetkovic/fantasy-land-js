import { Sum, Product, Max } from "../semigroup/1.js";
//empty :: Monoid m => () -> m

const fold = (M) => (xs) => xs.reduce((acc, x) => acc.concat(M(x)), M.empty());

const foldSum = fold(Sum)([1, 2, 3, 4]);
console.log(foldSum);
const foldProduct = fold(Product)([1, 2, 3, 4]);
console.log(foldProduct);
const foldMax = fold(Max)([1, 2, 3, 4]);
console.log(foldMax);
