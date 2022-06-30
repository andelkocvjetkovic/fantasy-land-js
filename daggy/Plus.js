import daggy from "daggy";

const Plus = (T) => {
  const Plus_ = daggy.tagged("Plus", ["value"]);

  Plus_.prototype.concat = function (that) {
    return Plus(this.value.alt(that.value));
  };

  Plus_.empty = () => Plus_(T.zero());
  return Plus_;
};
