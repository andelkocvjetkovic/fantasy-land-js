const toArray = (xs) => xs.reduce((acc, x) => acc.concat([x]), []);

const f = (sum, x) => sum + x;
const u = [1, 2, 3];
console.log(u.reduce(f).toString() === toArray(u).reduce(f).toString());
