import { Piece } from "./piece";

export const defaultOrigin = { x: 0, y: 0 };

export class PieceQueue {
  queue: Piece[];
  actualPiece: Piece;
  savedPiece?: Piece;
  canSave: boolean = true;
  origin: { x: number; y: number };

  constructor(origin: { x: number; y: number } = defaultOrigin) {
    this.origin = origin;
    this.queue = new Array(5).fill(0).map(() => new Piece(this.origin));
    this.actualPiece = new Piece(this.origin);
  }

  pick() {
    return this.queue.at(0)!;
  }

  shift() {
    const piece = this.queue.shift()!;
    this.queue.push(new Piece(this.origin));
    this.actualPiece = piece;
    this.canSave = true;
    return piece;
  }

  save() {
    if (!this.canSave) return;
    const prevSavedPiece = this.savedPiece;
    this.savedPiece = this.actualPiece;
    this.savedPiece.x = this.origin.x;
    this.savedPiece.y = this.origin.y;
    if (prevSavedPiece) {
      this.actualPiece = prevSavedPiece;
    } else {
      this.shift();
    }
    this.canSave = false;
  }
}
