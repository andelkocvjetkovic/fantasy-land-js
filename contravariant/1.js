import daggy from "daggy";
//type ToString a :: a -> String
const ToString = daggy.tagged("ToString", ["f"]);

// contramap :: ToString a ~> (b -> a) -> ToString b
ToString.prototype.contramap = function (f) {
  return ToString((x) => this.f(f(x)));
};

// intToString :: ToString Int
const intToString = ToString((x) => `int(${x})`).contramap((x) => x | 0);

// stringArrayToString :: ToString [String]
const stringArrayToString = ToString((x) => `[${x}]`).contramap((x) =>
  x.join(", ")
);
//arrayToString :: ToString a -> ToString [a]
const arrayToString = (t) => stringArrayToString.contramap((x) => x.map(t.f));

// intsToString :: ToString [Int]
const intsToString = arrayToString(intToString);

//matrixToString :: ToString [[Int]]
const matrixToString = arrayToString(intsToString);

console.log(matrixToString.f([[1, 3, 4]]));
