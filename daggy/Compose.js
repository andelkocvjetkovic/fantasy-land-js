import daggy from "daggy";

const Compose = (F, G) => {
  const Compose_ = daggy.tagged("Compose", ["stack"]);

  Compose_.of = (x) => Compose_(F.of(G.of(x)));

  Compose_.prototype.map = function (f) {
    return Compose_(this.stack.map((x) => x.map(f)));
  };

  Compose_.prototype.ap = function (fs) {
    return Compose_(this.stack.map((x) => (f) => x.ap(f)).ap(fs.stack));
  };

  return Compose_;
};

export default Compose;
