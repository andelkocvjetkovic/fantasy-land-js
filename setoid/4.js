import { Coord } from "../daggy/0.mjs";

//reverse :: [x] -> [x]
const reverse = (xs) => xs.reduce((acc, x) => [x, ...acc], []);

//indexOf :: Setoid a => [a] -> a -> Int
const indexOf = (arr) => (x) => {
  for (let i = 0; i < arr.length; i++) if (arr[i].equals(x)) return i;
  return -1;
};

// nub :: [x] -> [x]
const nub = (xs) => xs.filter((x, idx) => xs.indexOf(x) === idx);

// nub :: Setoid x => [x] -> [x]
const nub_ = (xs) => xs.filter((x, idx) => indexOf(xs)(x) === idx);

// isPalindrome :: Setoid a => [a] -> Bool
const isPalindrome = (xs) => {
  const reversedXs = reverse(xs);
  return xs.reduce(
    (isPalindrome, x, idx) => isPalindrome && x.equals(reversedXs[idx]),
    true
  );
};

const arr = [Coord(1, 2, 3), Coord(1, 2, 3)];
/*console.log(nub(arr));
console.log(nub_(arr));

console.log(
  isPalindrome([Coord(1, 2, 3), Coord(3, 4, 5), Coord(6, 7, 8)]) === false
);
console.log(
  isPalindrome([Coord(1, 2, 3), Coord(3, 4, 5), Coord(1, 2, 3)]) === true
);*/
export { nub_ };
