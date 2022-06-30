import daggy from "daggy";

const Alt = daggy.tagged("Alt", ["value"]);

Alt.prototype.concat = function (that) {
  return Alt(this.value.alt(that.value));
};

export default Alt;
