//concat :: Semigroup => a ~> a -> a
//
//associativity

//a.concat(b).concat(c) === a.concat(b.concat(c));
console.log(
  "hi".concat(",").concat("world") === "hi".concat(",".concat("world"))
);

console.log(
  [1].concat([2]).concat([3]).toString() ===
    [1].concat([2].concat([3])).toString()
);
