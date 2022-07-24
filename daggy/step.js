import daggy from "daggy";

const { Done, Loop } = daggy.taggedSum("Step", {
  Done: ["b"],
  Loop: ["a"],
});

export { Done, Loop };
