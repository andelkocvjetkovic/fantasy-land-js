import daggy from "daggy";
// compose :: (b -> c) ->  (a -> b) -> a -> c
const compose = (f) => (g) => (x) => f(g(x));

// mcompose :: Chain m => (b -> m c) -> (a -> m b) -> a -> m c
const mcompose = (f) => (g) => (x) => g(x).chain(f);

const Compose = daggy.tagged("Compose", ["f"]);

// concat ::      (a -> a)
//        -> (a -> a)
//        ->  a   ->    a
Compose.prototype.concat = function (that) {
  return Compose((x) => this.f(that.f(x)));
};

Compose.empty = () => Compose((x) => x);

const res = Compose.empty()
  .concat(Compose((x) => x + 2).concat(Compose((x) => x * 2)))
  .concat(Compose((x) => x - 20));
console.log(res.f(5));

const MCompose = daggy.tagged("MCompose", ["f"]);

// concat :: Chain m
//        =>        (a -> m a)
//        -> (a -> m a)
//        ->  a     ->    m a
MCompose.prototype.concat = function (that) {
  return MCompose((x) => that.f(x).chain(this.f));
};

// empty :: Chain m, Applicative m
//       => (a -> m a)
MCompose.empty = () => MCompose((x) => M.of(x));
