// ap :: Apply f => f a ~> f (a -> b) -> f b
//
// lift2 :: Applicative f
//       =>  (a ->   b ->   c)
//       -> f a -> f b -> f c
export const lift2 = (f) => (a) => (b) => b.ap(a.map(f));
