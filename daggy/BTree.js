import daggy from "daggy";
import { lift3 } from "../apply/liftN.js";

// BTree a
const BTree = daggy.taggedSum("BTree", {
  Node: ["left", "x", "right"],
  Leaf: [],
});

BTree.prototype.reduce = function (f, acc) {
  return this.cata({
    Node: (l, x, r) => {
      const Left = l.reduce(f, acc);
      const LeftAndMiddle = f(Left, x);
      return r.reduce(f, LeftAndMiddle);
    },
    Leaf: () => acc,
  });
};

BTree.prototype.traverse = function (T, f) {
  return this.cat({
    Node: (l, x, r) =>
      //prettier-ignore
      lift3((l) => (x) => (r) => BTree.Node(l, x, r))
      (l.traverse(T, f))
      (f(x))
      (r.traverse(T, f)),
    Leaf: () => T.of(BTree.Leaf),
  });
};

export default BTree;
