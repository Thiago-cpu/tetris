import { Scene } from "three";
import { Cube } from "../cube";
import { Game } from "@/app/core/game";
import { ColorSystem } from "./boardScene";

export class SavedPieceScene extends Scene {
  game: Game;
  colorSystem: ColorSystem;
  constructor(game: Game, colorSystem: ColorSystem) {
    super();
    this.game = game;
    this.colorSystem = colorSystem;
    this.translateX(-8);
  }

  override add(...cubes: Cube[]) {
    return super.add(...cubes);
  }

  draw(deltaTime: number) {
    this.rotation.y += 0.001 * deltaTime;
    this.game.pieceQueue.savedPiece?.frame.body.forEachValue((value, x, y) => {
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
