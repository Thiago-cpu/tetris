import { constrain } from "@/lib/utils";
import { PieceQueue } from "./pieceQueue";
import { Board } from "./board";
const SPACE = " ";

const ACTIONS = {
  right: "right",
  left: "left",
  down: "down",
  rotate_right: "rotate_right",
  rotate_left: "rotate_left",
  end: "end",
  save: "save",
} as const;

const ROTATIONS = {
  right: "right",
  left: "left",
} as const;

const KEY_TO_ACTION = {
  ArrowRight: ACTIONS.right,
  d: ACTIONS.right,
  ArrowDown: ACTIONS.down,
  s: ACTIONS.down,
  ArrowLeft: ACTIONS.left,
  a: ACTIONS.left,
  ArrowUp: ACTIONS.rotate_left,
  w: ACTIONS.rotate_left,
  z: ACTIONS.rotate_right,
  c: ACTIONS.save,
  [SPACE]: ACTIONS.end,
} as const;

type TKeyToAction = typeof KEY_TO_ACTION;
type TPieceDirection = "left" | "right" | "down" | "static";
type TPieceRotation = keyof typeof ROTATIONS;
const MOVEMENT_TO_VECTOR: Record<TPieceDirection, readonly [number, number]> = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  static: [0, 0],
} as const;

export class Game {
  blockSize = 30;
  board = new Board();
  pieceQueue = new PieceQueue({ x: this.width / 2, y: 0 });

  canMove(direction: TPieceDirection) {
    const [x, y] = MOVEMENT_TO_VECTOR[direction];
    const newX = this.pieceQueue.actualPiece.x + x;
    const newY = this.pieceQueue.actualPiece.y + y;

    return this.board.validChunk(
      this.pieceQueue.actualPiece.frame.body,
      newX,
      newY,
    );
  }

  move(direction: TPieceDirection) {
    if (!this.canMove(direction)) return;
    const [x, y] = MOVEMENT_TO_VECTOR[direction];
    const newX = constrain(
      0,
      this.pieceQueue.actualPiece.x + x,
      this.width - this.pieceQueue.actualPiece.frame.body[0].length,
    );
    const newY = constrain(
      0,
      this.pieceQueue.actualPiece.y + y,
      this.height - this.pieceQueue.actualPiece.frame.body.length,
    );
    this.pieceQueue.actualPiece.x = newX;
    this.pieceQueue.actualPiece.y = newY;
  }

  rotate(rotation: TPieceRotation) {
    const canRotate = true;
    if (!canRotate) return;
    const newFrameIndex =
      this.actualPiece.actualFrameIndex +
      (rotation === ROTATIONS.right ? 1 : -1);
    const nextFrame = this.actualPiece.frameAt(newFrameIndex);

    let rightWall = this.width;
    for (let x = this.actualPiece.x; x < this.width; x++) {
      const value = this.board.body[this.actualPiece.y][x];
      if (value > 0) {
        rightWall = x;
        break;
      }
    }
    let bottomWall = this.height;
    for (let y = this.actualPiece.y; y < this.height; y++) {
      const value = this.board.body[y][this.actualPiece.x];
      if (value > 0) {
        bottomWall = y;
        break;
      }
    }

    const newX = constrain(
      0,
      this.actualPiece.x,
      rightWall - nextFrame.body.cols,
    );
    const newY = constrain(
      0,
      this.actualPiece.y,
      bottomWall - nextFrame.body.length,
    );

    if (!this.board.validChunk(nextFrame.body, newX, newY)) return;

    this.actualPiece.setFrameIndex(newFrameIndex);
    this.actualPiece.x = newX;
    this.actualPiece.y = newY;
  }

  action(key: string) {
    const action = KEY_TO_ACTION[key as keyof TKeyToAction];
    if (!action) return;
    if (action in MOVEMENT_TO_VECTOR) this.move(action as TPieceDirection);
    if (action === ACTIONS.rotate_left) {
      this.rotate(ROTATIONS.left);
    }
    if (action === ACTIONS.rotate_right) {
      this.rotate(ROTATIONS.right);
    }
    if (action === ACTIONS.end) {
      while (this.canMove("down")) {
        this.move("down");
      }
      this.nextPiece();
    }
    if (action === ACTIONS.save) {
      this.pieceQueue.save();
    }
  }

  gravity() {
    if (this.canMove("down")) {
      this.move("down");
    } else {
      this.nextPiece();
    }
  }

  nextPiece() {
    this.board.setChunk(
      this.actualPiece.frame.body,
      this.actualPiece.x,
      this.actualPiece.y,
    );
    this.pieceQueue.shift();
  }

  get actualPiece() {
    return this.pieceQueue.actualPiece;
  }

  get width() {
    return this.board.width;
  }

  get height() {
    return this.board.height;
  }
}
