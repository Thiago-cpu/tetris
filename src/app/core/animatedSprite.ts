import { Matrix } from "./matrix";
import { Sprite } from "./sprite";

export class AnimatedSprite {
  frames: Sprite[] = [];
  actualFrameIndex: number;

  constructor(firstFrame: Matrix<number>) {
    this.frames.push(new Sprite(firstFrame));
    this.actualFrameIndex = 0;
    this.generateFrames();
  }

  private generateFrames() {
    for (let index = 0; index < 3; index++) {
      const lastFrame = this.frames.at(-1)!;
      const newFrame = new Sprite(Matrix.rotate(lastFrame.body));
      this.frames.push(newFrame);
    }
  }

  next() {
    this.actualFrameIndex = (this.actualFrameIndex + 1) % this.frames.length;
    return this.frame;
  }

  prev() {
    this.actualFrameIndex = (this.actualFrameIndex - 1) % this.frames.length;
    return this.frame;
  }

  frameAt(index: number) {
    return this.frames.at(index % this.frames.length)!;
  }

  setFrameIndex(index: number) {
    this.actualFrameIndex = index % this.frames.length;
  }

  get frame() {
    return this.frames.at(this.actualFrameIndex)!;
  }

  get originalFrame() {
    return this.frames.at(0)!;
  }
}
