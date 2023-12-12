import { Game } from "../core/game";
import { Matrix } from "../core/matrix";
import { Piece } from "../core/piece";

export class Game_2D {
  game: Game;
  colors = {
    border: "#efefef",
    line: "#353435",
  };
  blockSize = 30;

  static valueToColor = {
    1: "#fb903e",
    2: "#0d5ec8",
    3: "#b42f1f",
    4: "#62a14e",
    5: "#af298a",
    6: "#fd923f",
    7: "#009dca",
  } as Record<number, string>;

  constructor(gameEngine: Game) {
    this.game = gameEngine;
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.game.update(deltaTime);
    ctx.reset();
    this.drawBoard(ctx);
    this.drawPreviewPiece(ctx);
    this.drawActualPiece(ctx);
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    // draw column lines
    ctx.fillStyle = this.colors.line;
    for (let c = 1; c < this.game.width; c++) {
      ctx.fillRect(c * this.blockSize, 0, 1, this.blockSize * this.game.height);
    }
    // draw row lines
    for (let r = 1; r < this.game.height; r++) {
      ctx.fillRect(0, r * this.blockSize, this.blockSize * this.game.width, 1);
    }

    // draw board border
    ctx.strokeStyle = this.colors.border;
    ctx.strokeRect(
      0,
      0,
      this.blockSize * this.game.width,
      this.blockSize * this.game.height,
    );

    // draw solidified pieces
    this.game.board.body.forEachValue((value, x, y) => {
      if (value === 0) return;
      ctx.fillStyle = Game_2D.valueToColor[value];
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
    this.game.actualPiece.frame.body.forEachValue(
      (value, relativeX, relativeY) => {
        if (value === 0) return;
        const x = relativeX + this.game.actualPiece.x;
        const y = relativeY + this.game.actualPiece.y;

        const color = Game_2D.valueToColor[value];
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
      },
    );
  }

  drawPreviewPiece(ctx: CanvasRenderingContext2D) {
    const previewX = this.game.actualPiece.x;
    let previewY = this.game.actualPiece.y;

    while (
      this.game.board.validChunk(
        this.game.actualPiece.frame.body,
        previewX,
        previewY + 1,
      )
    ) {
      previewY++;
    }
    if (previewY == this.game.actualPiece.y) return;
    this.game.actualPiece.frame.body.forEachValue(
      (value, relativeX, relativeY) => {
        if (value === 0) return;
        const x = relativeX + previewX;
        const y = relativeY + previewY;

        const color = Game_2D.valueToColor[value] + "50";
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
      },
    );
  }

  drawSavedPiece(ctx: CanvasRenderingContext2D) {
    this.game.pieceQueue.savedPiece?.frame.body.forEachValue((value, x, y) => {
      if (value === 0) return;
      const color = Game_2D.valueToColor[value];
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
    this.game.pieceQueue.queue.forEach((piece, absoluteY) => {
      piece.originalFrame.body.forEachValue((value, x, relativeY) => {
        const y = relativeY + absoluteY * 4;
        if (value === 0) return;
        ctx.fillStyle = Game_2D.valueToColor[value];
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

  get height() {
    return this.game.height;
  }

  get width() {
    return this.game.width;
  }
}
