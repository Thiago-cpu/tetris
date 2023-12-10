import { Color, Scene } from "three";
import { Cube } from "../cube";
import { Game } from "@/app/core/game";

export type ColorSystem = Record<number, Color>;

export class BoardScene extends Scene {
  game: Game;
  colorSystem: ColorSystem;
  constructor(game: Game, colorSystem: ColorSystem) {
    super();
    this.game = game;
    this.colorSystem = colorSystem;
  }

  override add(...cubes: Cube[]) {
    return super.add(...cubes);
  }

  draw() {
    this.drawSolidifiedPieces();
    this.drawActualPiece();
  }

  drawActualPiece() {
    this.game.actualPiece.frame.body.forEachValue(
      (value, relativeX, relativeY) => {
        if (value === 0) return;
        const x = relativeX + this.game.actualPiece.x;
        const y = relativeY + this.game.actualPiece.y;
        const color = this.colorSystem[value];
        this.add(new Cube({ mesh: { color }, position: { x, y } }));
      },
    );
  }

  drawSolidifiedPieces() {
    this.game.board.body.forEachValue((value, x, y) => {
      if (value === 0) return;
      const color = this.colorSystem[value];
      this.add(new Cube({ mesh: { color }, position: { x, y } }));
    });
  }

  cleanup() {
    this.children.forEach((cube) => {
      if (cube instanceof Cube) cube.dispose();
    });
    this.clear();
  }
}
