import { AnimatedSprite } from "./animatedSprite";
import { Matrix } from "./matrix";

export class PieceFactory {
  static L = [
    [1, 0],
    [1, 0],
    [1, 1],
  ];

  static J = [
    [0, 2],
    [0, 2],
    [2, 2],
  ];

  static Z = [
    [3, 3, 0],
    [0, 3, 3],
  ];

  static S = [
    [0, 4, 4],
    [4, 4, 0],
  ];

  static T = [
    [0, 5, 0],
    [5, 5, 5],
  ];

  static O = [
    [6, 6],
    [6, 6],
  ];

  static I = [[7, 7, 7, 7]];

  static pieces = [this.L, this.J, this.Z, this.S, this.T, this.O, this.I];

  static randomPiece() {
    return new Matrix(
      this.pieces[Math.floor(Math.random() * PieceFactory.pieces.length)],
    );
  }
}

type PieceProps = {
  x: number;
  y: number;
};

export class Piece extends AnimatedSprite {
  static valueToColor = {
    1: "#fb903e",
    2: "#0d5ec8",
    3: "#b42f1f",
    4: "#62a14e",
    5: "#874c34",
    6: "#fd923f",
    7: "#009dca",
  } as Record<number, string>;
  x: number;
  y: number;
  constructor({ x, y }: PieceProps) {
    super(PieceFactory.randomPiece());
    this.x = x;
    this.y = y;
  }
}
