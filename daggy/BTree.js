import daggy from "daggy";

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
export default BTree;
