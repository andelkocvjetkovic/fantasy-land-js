import { Coord } from "../daggy/0.mjs";
// Setoid a => a -> a -> Bool;
const notEquals = (x) => (y) => !x.equals(y);

const res1 = Coord(1, 2, 3);
const res2 = Coord(1, 2, 6);

//console.log(notEquals(res1)(res2));
export { notEquals };
