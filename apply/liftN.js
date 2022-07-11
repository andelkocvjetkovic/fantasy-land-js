// ap :: Apply f => f a ~> f (a -> b) -> f b
//
// lift2 :: Applicative f
//       =>  (a ->   b ->   c)
//       -> f a -> f b -> f c
export const lift2 = (f) => (a) => (b) => b.ap(a.map(f));

// lift3  :: Applicative f
//        => (a -> b -> c -> d)
//        -> f a -> f b -> f c -> f d
export const lift3 = (f) => (a) => (b) => (c) => c.ap(b.ap(a.map(f)));

// lift4  :: Applicative f
//        => (a -> b -> c -> d -> f)
//        -> f a -> f b -> f c -> f d -> f f
export const lift4 = (f) => (a) => (b) => (c) => (d) =>
  d.ap(c.ap(b.ap(a.map(f))));
