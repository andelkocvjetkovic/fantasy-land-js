import daggy from "daggy";
import { Min, Any, Sum, All } from "./1.js";
const Tuple4 = daggy.tagged("Tuple4", ["a", "b", "c", "d"]);
Tuple4.prototype.concat = function (that) {
  return Tuple4(
    this.a.concat(that.a),
    this.b.concat(that.b),
    this.c.concat(that.c),
    this.d.concat(that.d)
  );
};
const First = daggy.tagged("First", ["val"]);
First.prototype.concat = function (that) {
  return this;
};
const Customer = daggy.tagged("Customer", [
  "name", // String
  "favouriteThings", // [String]
  "registrationDate", // Int
  "hasMadePurchase", // Bool
]);

Customer.prototype.concat = function (that) {
  return Customer(
    this.name,
    this.favouriteThings.concat(that.favouriteThings),
    Math.min(this.registrationDate, that.registrationDate),
    this.hasMadePurchase || that.hasMadePurchase
  );
};

const customerStrategy = {
  //to:: Customer a -> Tuple4 (First String) [String] (Min Int) (Any Bool)
  to: (customer) =>
    Tuple4(
      First(customer.name),
      customer.favouriteThings,
      Sum(customer.registrationDate),
      All(customer.hasMadePurchase)
    ),
  //from:: Tuple4 (First String) [String] (Min Int) (Any Bool) -> Customer
  from: ({ a, b, c, d }) => Customer(a.val, b, c.val, d.val),
};
// merge :: Semigroup m => {to: a -> m,from: m -> a} -> a -> a -> a
const merge = (strategy) => (x) => (y) =>
  strategy.from(strategy.to(x).concat(strategy.to(y)));

const mergeMany = (strategy) => (initial) => (customers) =>
  customers.reduce((x, y) => merge(strategy)(x)(y), initial);

const Tom1 = Customer("Tom", ["socks"], 100000, false);
const Tom2 = Customer("TomH", ["gloves"], 90000, true);
const Tom3 = Customer("TomH", ["t-shirt"], 90000, true);
const Tom4 = Customer("TomH", ["jacket"], 90000, true);
// { name: 'Tom'
// , favouriteThings: ['socks', 'gloves']
// , registrationDate: 90000
// , hasMadePurchase: true
// }

console.log(merge(customerStrategy)(Tom1)(Tom2));
console.log(mergeMany(customerStrategy)(Tom1)([Tom2, Tom3, Tom4]));
