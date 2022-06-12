import daggy from "daggy";

const Bool = daggy.taggedSum("Bool", { True: [], False: [] });
const { True, False } = Bool;
//Flip the value of the Bool
Bool.prototype.invert = function () {
  return this.cata({
    True: () => False,
    False: () => True,
  });
};

Bool.prototype.thenElse = function (than, or) {
  return this.cata({
    True: than,
    False: or,
  });
};

// equals :: Setoid a => Bool a ~> Bool a -> Bool
Bool.prototype.equals = function (that) {
  return Bool.True.is(this) === Bool.True.is(that);
};

export { Bool };
