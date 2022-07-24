// range :: (Int,Int) -> [Int]
const range = (from, to) => [...Array(to - from)].map((_, idx) => idx + from);

export { range };
