import daggy from "daggy";

const List = daggy.taggedSum("List", {
  Cons: ["head", "tail"],
  Nil: [],
});

// map :: List a => List a ~> (a -> b) -> List b
List.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) => List.Cons(f(head), tail.map(f)),
    Nil: () => List.Nil,
  });
};

// from :: [x] => [x] -> List x
List.from = function (xs) {
  return xs.reduceRight((acc, x) => List.Cons(x, acc), List.Nil);
};

// toArray :: List x ~> () -> [x]
List.prototype.toArray = function () {
  return this.cata({
    Cons: (head, tail) => [head, ...tail.toArray()],
    Nil: () => [],
  });
};

// filter :: List x ~> (x -> Bool) -> List x
List.prototype.filter = function (p) {
  return this.cata({
    Cons: (head, tail) =>
      p(head) ? List.Cons(head, tail.filter(p)) : tail.filter(p),
    Nil: () => List.Nil,
  });
};

// reduce :: List a ~> ((b,a) -> b) -> b -> List b
List.prototype.reduce = function (f, initValue) {
  return this.cata({
    Cons: (head, tail) => [head, ...tail.toArray()].reduce(f, initValue),
    Nil: () => List.Nil,
  });
};

console.log(
  List.from([1, 2, 3])
    .map((x) => x + 2)
    .filter((x) => x > 4)
    .reduce((acc, x) => (x > 2 ? (acc += 10) : acc), 0)
);