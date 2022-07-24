import daggy from "daggy";
import { Done, Loop } from "./step.js";

const Pair = (T) => {
  const Pair_ = daggy.tagged("Pair", ["_1", "_2"]);

  // map :: Pair a b ~> (b -> c) -> Pair a c
  Pair_.prototype.map = function (f) {
    return Pair_(this._1, f(this._2));
  };

  // ap :: Semigroup a => Pair a b ~> Pair a (b -> c) -> Pair a c
  Pair_.prototype.ap = function (fs) {
    return Pair_(fs._1.concat(this._1), fs._2(this._2));
  };

  // chain :: Semigroup a => Pair a b ~> (b -> Pair a c) -> Pair a c
  Pair_.prototype.chain = function (f) {
    const that = f(this._2);
    return Pair_(this._1.concat(that._1), that._2);
  };

  // chainRec :: Monoid m => (a -> Pair (Step b a), a) -> Pair (m, b)
  Pair_.chainRec = function (f, init) {
    let acc = T.empty(),
      step = Loop(init);

    do {
      const res = f(step.a);
      acc = acc.concat(res._1);
      step = res._2;
    } while (Loop.is(step));

    return Pair_(acc, step.b);
  };

  Pair_.of = (x) => Pair_(T.empty(), x);

  return Pair_;
};

export default Pair;
