export const id = (x) => x;
export const compose = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

// add2 :: Int -> Int
export const add2 = (a) => a + 2;
// mul3 :: Int -> Int
export const mul3 = (a) => a * 3;
// sub2 :: (Int,Int) -> Int
export const sub = (a, b) => a - b;

// map :: Functor f => f a ~> (a -> b) -> f b
// Identity
// u.map(id) === u

// Composition:
// u.map(f).map(g) === u.map(x => g(f(x)))
