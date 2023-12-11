import { Scene } from "three";
import { Cube } from "../cube";
import { Game } from "@/app/core/game";
import { ColorSystem } from "./boardScene";

export class PieceQueueScene extends Scene {
  game: Game;
  colorSystem: ColorSystem;
  constructor(game: Game, colorSystem: ColorSystem) {
    super();
    this.game = game;
    this.colorSystem = colorSystem;
    this.translateX(this.game.width + 8);
  }

  override add(...cubes: Cube[]) {
    return super.add(...cubes);
  }

  draw(deltaTime: number) {
    this.game.pieceQueue.queue.forEach((piece, absoluteY) =>
      piece.frame.body.forEachValue((value, relativeX, relativeY) => {
        if (value === 0) return;
        const color = this.colorSystem[value];
        const cube = new Cube({
          mesh: { color },
          position: { x: relativeX, y: relativeY + absoluteY * 4 },
        });
        this.add(cube);
      }),
    );
  }

  cleanup() {
    this.children.forEach((cube) => {
      if (cube instanceof Cube) cube.dispose();
    });
    this.clear();
  }
}
