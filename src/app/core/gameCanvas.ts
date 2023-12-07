import { Game } from "./game";
import { Piece } from "./piece";

export class GameCanvas extends Game {
  constructor() {
    super();
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
    this.board.body.forEachValue((value, x, y) => {
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
  }

  drawActualPiece(ctx: CanvasRenderingContext2D) {
    this.actualPiece.frame.body.forEachValue((value, relativeX, relativeY) => {
      if (value === 0) return;
      const x = relativeX + this.actualPiece.x;
      const y = relativeY + this.actualPiece.y;

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
      piece.originalFrame.body.forEachValue((value, x, relativeY) => {
        const y = relativeY + absoluteY * 4;
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
}
