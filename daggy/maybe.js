import daggy from "daggy";

const Maybe = daggy.taggedSum("Maybe", {
  Just: ["x"],
  Nothing: [],
});
const { Just, Nothing } = Maybe;
Maybe.prototype.map = function (f) {
  return this.cata({
    // map :: Just a ~> (a -> b) -> f b
    Just: (x) => Just(f(x)),
    // map :: Nothing ~> (a -> b) -> Nothing
    Nothing: () => Nothing,
  });
};
Maybe.prototype.toString = function () {
  return this.cata({
    Just: (x) => `Just(${x})`,
    Nothing: () => "Nothing",
  });
};

Maybe.prototype.ap = function (that) {
  return this.cata({
    // ap :: Just a ~> Maybe (a -> b) -> Maybe b
    Just: (x) => that.map((f) => f(x)),
    // ap :: Nothing ~> Maybe(a -> b) -> Nothing
    Nothing: () => Nothing,
  });
};

Maybe.prototype.concat = function (that) {
  return this.cata({
    // concat :: Semigroup a => Just a ~> Maybe a ~> Just a
    Just: (x) => (Just.is(that) ? that.map((y) => x.concat(y)) : Just(x)),
    Nothing: () => that,
  });
};

// empty :: () => Nothing
Maybe.empty = () => Nothing;

Maybe.of = function (x) {
  return Just(x);
};

// alt :: Alf Maybe => Maybe a ~> Maybe a -> Maybe a
Maybe.prototype.alt = function (that) {
  return this.cata({
    Just: (_) => this,
    Nothing: (_) => that,
  });
};

// zero :: Plus Maybe => () -> Maybe a
Maybe.zero = () => Nothing;

// reduce :: Maybe a -> ((b,a) -> b,b) -> b
Maybe.prototype.reduce = function (f, acc) {
  return this.cata({
    Just: (x) => f(acc, x),
    Nothing: () => acc,
  });
};

export default Maybe;
