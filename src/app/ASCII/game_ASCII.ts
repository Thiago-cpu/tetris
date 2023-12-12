import { type Game } from "../core/game";

interface Elements {
  board: HTMLDivElement;
  queue: HTMLDivElement;
  savedPiece: HTMLDivElement;
}

export default class game_ASCII {
  game: Game;
  board: HTMLDivElement;
  queue: HTMLDivElement;
  savedPiece: HTMLDivElement;
  leftWall = "<span>&#10094;!</span>";
  rightWall = "<span>!&#10095;</span>";
  savedPieceSize = 4;
  static valueToASCII = {
    0: ".",
    1: "O",
    2: "O",
    3: "O",
    4: "O",
    5: "O",
    6: "O",
    7: "O",
    9: "[&nbsp;]",
  } as Record<number, string>;
  constructor(game: Game, { board, queue, savedPiece }: Elements) {
    this.game = game;
    this.board = board;
    this.queue = queue;
    this.savedPiece = savedPiece;
  }

  sanitizedSavedPieceBody() {
    const newBody: number[][] = [];
    for (let y = 0; y < this.savedPieceSize; y++) {
      newBody[y] = [];
      for (let x = 0; x < this.savedPieceSize; x++) {
        newBody[y][x] =
          this.game.pieceQueue.savedPiece?.frame.body[
            y -
              (this.savedPieceSize -
                this.game.pieceQueue.savedPiece.frame.body.rows)
          ]?.[x] ?? 0;
      }
    }
    return newBody;
  }

  sanitizedBoardBody() {
    const newBody = this.game.board.body.map((row) => row.map((v) => v));
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
    this.game.actualPiece.frame.body.forEachValue(
      (value, relativeX, relativeY) => {
        if (value === 0) return;
        const x = relativeX + previewX;
        const y = relativeY + previewY;
      },
    );
    this.game.actualPiece.frame.body.forEachValue(
      (value, relativeX, relativeY) => {
        if (value === 0) return;
        const preview = {
          x: relativeX + previewX,
          y: relativeY + previewY,
        };
        newBody[preview.y][preview.x] = 9;
        const x = relativeX + this.game.actualPiece.x;
        const y = relativeY + this.game.actualPiece.y;
        newBody[y][x] = value;
      },
    );
    return newBody;
  }

  sanitizePreviewQueue() {
    const newBody = new Array(this.game.height)
      .fill(0)
      .map(() => new Array<number>(4).fill(0));
    this.game.pieceQueue.queue.forEach((piece, absoluteY) => {
      piece.originalFrame.body.forEachValue((value, x, relativeY) => {
        const y = relativeY + absoluteY * 4;
        newBody[y][x] = value;
      });
    });
    return newBody;
  }

  draw(deltaTime: number) {
    this.game.update(deltaTime);
    this.drawSavedPiece();
    this.drawBoard();
    this.drawPieceQueue();
  }

  drawSavedPiece() {
    const savedPieceBody = this.sanitizedSavedPieceBody();
    this.savedPiece.innerHTML = this.generateBody(savedPieceBody, 8);
  }

  drawBoard() {
    const sanitizedBody = this.sanitizedBoardBody();
    this.board.innerHTML = this.generateBody(
      sanitizedBody,
      this.game.width * 2,
    );
  }

  drawPieceQueue() {
    const pieceQueueBody = this.sanitizePreviewQueue();
    this.queue.innerHTML = this.generateBody(pieceQueueBody, 8);
  }

  generateBlock(value: number) {
    return `<span style='width: 4px; height: 4px; ${
      value === 9 ? "opacity: 0.5" : ""
    }'>${game_ASCII.valueToASCII[value]}</span>`;
  }

  generateBody(body: number[][], width: number) {
    return `<div style="display: flex; flex-direction: column;">${body
      .map(
        (row) =>
          `<div style="display: flex; justify-content: space-between;">
            ${this.leftWall}
              ${row.map(this.generateBlock).join("")} 
            ${this.rightWall}
          </div>`,
      )
      .join("")}
      ${this.generateBase(width)}
      </div>`;
  }

  generateBase(width: number) {
    return (
      `<div>${this.leftWall}${"=".repeat(width)}${this.rightWall}</div>` +
      `<div style="display: flex; justify-content: space-between;">${"<div>&#9876;</div>".repeat(
        width / 2,
      )}</div>`
    );
  }
}
