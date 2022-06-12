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

// reduce :: List a ~> (((b , a) -> b), b) -> b
List.prototype.reduce = function (f, initValue) {
  return this.cata({
    Cons: (head, tail) => tail.reduce(f, f(initValue, head)),
    Nil: () => initValue,
  });
};

// equals:: Setoid a => List a ~> List a -> Bool
List.prototype.equals = function (that) {
  return this.cata({
    Cons: (head, tail) => head.equals(that.head) && tail.equals(that.tail),
    Nil: () => List.Nil.is(that),
  });
};

List.prototype.lte = function (that) {
  return this.cata({
    Cons: (head, tail) =>
      that.cata({
        Cons: (head_, tail_) =>
          head.equals(head_) ? tail.lte(tail_) : head.lte(head_),
        Nil: () => false,
      }),
    Nil: () => true,
  });
};

/*console.log(
  List.from([1, 2, 3])
    .map((x) => x + 2)
    .filter((x) => x > 4)
    .reduce((acc, x) => (x > 3 ? acc + x : acc), 0)
);*/

export { List };
