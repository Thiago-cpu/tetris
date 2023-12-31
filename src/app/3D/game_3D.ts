import { Color } from "three";
import { Game } from "../core/game";
import { Base } from "./base";
import { BoardScene } from "./scenes/boardScene";
import { SavedPieceScene } from "./scenes/savedPieceScene";
import { WorldScene } from "./scenes/worldScene";
import { PieceQueueScene } from "./scenes/pieceQueueScene";

export class Game_3D {
  static valueToColor = {
    1: new Color("#fb903e"),
    2: new Color("#0d5ec8"),
    3: new Color("#b42f1f"),
    4: new Color("#62a14e"),
    5: new Color("#af298a"),
    6: new Color("#fd923f"),
    7: new Color("#009dca"),
  } as Record<number, Color>;
  world: WorldScene;
  board: BoardScene;
  savedPiece: SavedPieceScene;
  metalBase: Base;
  game: Game;
  pieceQueue: PieceQueueScene;

  constructor(gameEngine: Game) {
    this.game = gameEngine;
    this.world = new WorldScene(this.game, Game_3D.valueToColor);
    this.board = new BoardScene(this.game, Game_3D.valueToColor);
    this.savedPiece = new SavedPieceScene(this.game, Game_3D.valueToColor);
    this.pieceQueue = new PieceQueueScene(this.game, Game_3D.valueToColor);
    this.metalBase = new Base({
      geometry: [this.width + 5, 1, 5],
      position: { x: this.width / 2, y: this.height, z: 0 },
    });
    this.world.add(this.board);
    this.world.add(this.savedPiece);
    this.world.add(this.metalBase);
    this.world.add(this.pieceQueue);
  }

  draw(deltaTime: number) {
    this.savedPiece.cleanup();
    this.board.cleanup();
    this.pieceQueue.cleanup();
    this.game.update(deltaTime);
    this.world.update();
    this.savedPiece.draw(deltaTime);
    this.board.draw();
    this.pieceQueue.draw(deltaTime);
    this.world.render();
  }

  drawPreviewPiece() {
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
    // in progress...
  }

  get width() {
    return this.game.width;
  }

  get height() {
    return this.game.height;
  }
}
