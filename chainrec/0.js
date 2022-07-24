import Pair from "../daggy/pairT.js";
import { Done, Loop } from "../daggy/step.js";

Array.empty = () => [];

const Writer = Pair(Array);

// seq :: Int -> Writer [Int] Int
const seq = (upper) => {
  const seq_ = (init) =>
    init >= upper
      ? Writer([init], upper)
      : Writer([init], init + 1).chain(seq_);

  return seq_(1);
};

const seqRec = (upper) =>
  Writer.chainRec(
    (init) => Writer([init], init >= upper ? Done(init) : Loop(init + 1)),
    0
  );

const res = seqRec(10000);

console.log(res);
