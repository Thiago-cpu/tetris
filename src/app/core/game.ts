import { constrain } from "@/lib/utils";
import { PieceQueue } from "./pieceQueue";
import { Piece } from "./piece";
import { Color } from "./color";
const SPACE = " ";

const ACTIONS = {
  right: "right",
  left: "left",
  down: "down",
  rotate_right: "rotate_right",
  rotate_left: "rotate_left",
  end: "end",
} as const;

const KEY_TO_ACTION = {
  ArrowRight: ACTIONS.right,
  d: ACTIONS.right,
  ArrowDown: ACTIONS.down,
  s: ACTIONS.down,
  ArrowLeft: ACTIONS.left,
  a: ACTIONS.left,
  ArrowUp: ACTIONS.rotate_right,
  w: ACTIONS.rotate_right,
  z: ACTIONS.rotate_left,
  [SPACE]: ACTIONS.end,
} as const;

type TKeyToAction = typeof KEY_TO_ACTION;
type TPieceDirection = "left" | "right" | "down" | "static";

const MOVEMENT_TO_VECTOR: Record<TPieceDirection, readonly [number, number]> = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  static: [0, 0],
} as const;

export class Game {
  valueToColor = {
    0: "#000000",
  } as Record<number, string>;
  colors = {
    border: "#efefef",
    line: "#353435",
  };
  blockSize = 30;
  width = 10;
  height = 20;
  board = new Array(this.height)
    .fill(undefined)
    .map(() => new Array<number>(this.width).fill(0));
  pieceQueue = new PieceQueue({ x: this.width / 2, y: 0 });

  areValidCords(body: number[][], x: number, y: number): boolean {
    return body.every((row, relativeY) =>
      row.every(
        (value, relativeX) =>
          this.board[y + relativeY]?.[x + relativeX] === 0 || value === 0,
      ),
    );
  }

  forEachPiecePosition(cb: (value: number, x: number, y: number) => void) {
    this.actualPiece.frame.body.forEach((row, relativeY) => {
      row.forEach((value, relativeX) => {
        if (value === 0) return;
        cb(
          value,
          this.actualPiece.x + relativeX,
          this.actualPiece.y + relativeY,
        );
      });
    });
  }

  move(direction: TPieceDirection) {
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
    const areValidCords = this.areValidCords(
      this.pieceQueue.actualPiece.frame.body,
      newX,
      newY,
    );
    if (!areValidCords) return;
    this.pieceQueue.actualPiece.x = newX;
    this.pieceQueue.actualPiece.y = newY;
  }

  action(key: string) {
    if (key in KEY_TO_ACTION) {
    }
    const action = KEY_TO_ACTION[key as keyof TKeyToAction];
    if (!action) return;
    if (action in MOVEMENT_TO_VECTOR) this.move(action as TPieceDirection);
    if (action === ACTIONS.rotate_left) {
      this.pieceQueue.actualPiece.next();
      this.move("static");
    }
    if (action === ACTIONS.rotate_right) {
      this.pieceQueue.actualPiece.prev();
      this.move("static");
    }
    if (action === ACTIONS.end) {
      while (
        this.areValidCords(
          this.actualPiece.frame.body,
          this.actualPiece.x,
          this.actualPiece.y + 1,
        )
      ) {
        this.actualPiece.y += 1;
      }
      this.nextPiece();
    }
  }

  gravity() {
    const prevX = this.actualPiece.x;
    const prevY = this.actualPiece.y;
    this.move("down");
    const pieceIsStatic =
      prevX === this.actualPiece.x && prevY === this.actualPiece.y;
    if (!pieceIsStatic) return;

    this.nextPiece();
  }

  nextPiece() {
    this.forEachPiecePosition((value, x, y) => {
      this.board[y][x] = value;
    });
    this.removeSuccessRows();
    this.pieceQueue.shift();
  }

  removeSuccessRows() {
    const newBoard = [];
    this.board.forEach(
      (row) => row.some((value) => value === 0) && newBoard.push(row),
    );
    while (newBoard.length < this.board.length) {
      newBoard.unshift(new Array<number>(this.width).fill(0));
    }
    this.board = newBoard;
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    // draw column lines
    ctx.fillStyle = this.colors.line;
    for (let c = 1; c < this.width; c++) {
      ctx.fillRect(c * this.blockSize, 0, 1, this.blockSize * this.height);
    }
    // draw row lines
    for (let r = 1; r < this.height; r++) {
      ctx.fillRect(0, r * this.blockSize, this.blockSize * this.width, 1);
    }

    // draw board border
    ctx.strokeStyle = this.colors.border;
    ctx.strokeRect(
      0,
      0,
      this.blockSize * this.width,
      this.blockSize * this.height,
    );

    // draw solidified pieces
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 0) return;
        ctx.fillStyle = Piece.valueToColor[value];
        ctx.fillRect(
          x * this.blockSize,
          y * this.blockSize,
          this.blockSize,
          this.blockSize,
        );
        ctx.beginPath();
        ctx.moveTo(x * this.blockSize + this.blockSize, y * this.blockSize);
        ctx.lineTo(
          x * this.blockSize + this.blockSize,
          y * this.blockSize + this.blockSize,
        );
        ctx.lineTo(x * this.blockSize, y * this.blockSize + this.blockSize);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
      });
    });
  }

  drawActualPiece(ctx: CanvasRenderingContext2D) {
    this.forEachPiecePosition((value, x, y) => {
      const color = Piece.valueToColor[value];
      ctx.fillStyle = color;
      ctx.fillRect(
        x * this.blockSize,
        y * this.blockSize,
        this.blockSize,
        this.blockSize,
      );
      ctx.beginPath();
      ctx.moveTo(x * this.blockSize + this.blockSize, y * this.blockSize);
      ctx.lineTo(
        x * this.blockSize + this.blockSize,
        y * this.blockSize + this.blockSize,
      );
      ctx.lineTo(x * this.blockSize, y * this.blockSize + this.blockSize);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.closePath();
    });
  }

  drawPieceQueue(ctx: CanvasRenderingContext2D) {
    this.pieceQueue.queue.forEach((piece, absoluteY) => {
      piece.originalFrame.body.forEach((row, relativeY) => {
        const y = relativeY + absoluteY * 4;
        row.forEach((value, x) => {
          if (value === 0) return;
          ctx.fillStyle = Piece.valueToColor[value];
          ctx.fillRect(
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize,
          );
          ctx.beginPath();
          ctx.moveTo(x * this.blockSize + this.blockSize, y * this.blockSize);
          ctx.lineTo(
            x * this.blockSize + this.blockSize,
            y * this.blockSize + this.blockSize,
          );
          ctx.lineTo(x * this.blockSize, y * this.blockSize + this.blockSize);
          ctx.strokeStyle = "black";
          ctx.stroke();
          ctx.closePath();
        });
      });
    });
  }

  get actualPiece() {
    return this.pieceQueue.actualPiece;
  }
}
