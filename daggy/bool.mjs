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
Bool.prototype.elseThen = function (than, or) {
  return this.cata({
    True: than,
    False: or,
  });
};

export { Bool };
