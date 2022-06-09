import { Line, Shape, Coord } from "./daggy/0.mjs";
const origin = Coord(0, 0, 0);

const myLine = Line(origin, origin.translate(2, 4, 6));

const square = Shape.Square(Coord(1, 2, 3), Coord(4, 5, 6));
const circle = Shape.Circle(Coord(1, 2, 3), 3.14);

console.log(square.translate(1, 1, 1));
console.log(circle.translate(1, 1, 1));
