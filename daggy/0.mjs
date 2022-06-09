import daggy from "daggy";
//- A coordinate in 3D space
//+ Coord :: (Int,Int,Int) -> Coord
const Coord = daggy.tagged("Coord", ["x", "y", "z"]);
Coord.prototype.translate = function (x, y, z) {
  return Coord(this.x + x, this.y + y, this.z + z);
};

//- A line between two coordinates
//+ Line :: (Coord,Coord) -> Line
const Line = daggy.tagged("Line", ["from", "to"]);

const Shape = daggy.taggedSum("Shape", {
  //Square :: (Coord,Coord) -> Shape
  Square: ["topLeft", "bottomRight"],
  //Circle :: (Coord,Number) -> Shape
  Circle: ["center", "radius"],
});

Shape.prototype.translate = function (x, y, z) {
  return this.cata({
    Square: (topLeft, bottomRight) =>
      Shape.Square(topLeft.translate(x, y, z), bottomRight.translate(x, y, z)),
    Circle: (center, radius) => Shape.Circle(center.translate(x, y, z), radius),
  });
};

export { Coord, Line, Shape };