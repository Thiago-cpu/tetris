import { Piece } from "./piece";

export const Origin = { x: 0, y: 0 };

export class PieceQueue {
  queue: Piece[];
  actualPiece: Piece;
  origin: { x: number; y: number };

  constructor(origin: { x: number; y: number } = Origin) {
    this.origin = origin;
    this.queue = new Array(5).fill(0).map(() => new Piece(this.origin));
    this.actualPiece = new Piece(this.origin);
  }

  shift() {
    const piece = this.queue.shift()!;
    this.queue.push(new Piece(this.origin));
    this.actualPiece = piece;
    return piece;
  }

  pick() {
    return this.queue.at(0)!;
  }
}
