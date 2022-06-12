import { Coord } from "../daggy/0.mjs";

// equals :: Setoid a => [a] -> [a] -> Bool
Array.prototype.equals = function (that) {
  return (
    this.length === that.length &&
    this.reduce(
      (isEquals, thisV, idx) => isEquals && thisV.equals(that[idx]),
      true
    )
  );
};

const a = [Coord(1, 2, 3), Coord(2, 3, 4)];
const b = [Coord(1, 2, 3), Coord(2, 3, 4)];
const c = [Coord(1, 2, 3), Coord(2, 3, 4)];

// law 1 reflexivity
console.log("reflexivity");
console.log(a.equals(a) === true);
console.log(b.equals(b) === true);
console.log(c.equals(c) === true);

//law 2 symmetry or commutativity
console.log("\n============");
console.log("symmetry or commutativity");
console.log(a.equals(b) === b.equals(a));
console.log(b.equals(c) === c.equals(b));

//law 2 transitivity
console.log("\n============");
console.log("transitivity");
console.log(a.equals(b));
console.log(b.equals(c));
console.log(a.equals(c));
