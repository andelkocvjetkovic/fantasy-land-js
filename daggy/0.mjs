import daggy from "daggy";
//- A coordinate in 3D space
//+ Coord :: (Int,Int,Int) -> Coord
const Coord = daggy.tagged("Coord", ["x", "y", "z"]);
Coord.prototype.translate = function (x, y, z) {
  return Coord(this.x + x, this.y + y, this.z + z);
};

// equals:: Setoid a => Coord a ~> Coord a -> Bool
Coord.prototype.equals = function (that) {
  return this.x === that.x && this.y === that.y && this.z === that.z;
};

//- A line between two coordinates
//+ Line :: (Coord,Coord) -> Line
const Line = daggy.tagged("Line", ["from", "to"]);

// equals :: Setoid a => Line a ~> Line a -> Bool
Line.prototype.equals = function (that) {
  return this.from.equals(that.from) && this.to.equals(that.to);
};

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
