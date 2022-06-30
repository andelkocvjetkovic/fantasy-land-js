import Maybe from "../daggy/Maybe.js";
const { Just, Nothing } = Maybe;

const x = Just(4);
// Right identity - zero on the right
const rightIdentity = x.alt(Maybe.zero()).toString() === x.toString();
console.log(rightIdentity);

// Left identity - zero on the left
const leftIdentity = Maybe.zero().alt(x).toString() === x.toString();
console.log(leftIdentity);
