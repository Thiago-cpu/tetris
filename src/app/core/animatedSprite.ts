import { Sprite } from "./sprite";

export class AnimatedSprite {
  frames: Sprite[] = [];
  actualFrameIndex: number;

  constructor(firstFrame: number[][]) {
    this.frames.push(new Sprite(firstFrame));
    this.actualFrameIndex = 0;
    this.generateFrames();
  }

  private generateFrames() {
    for (let index = 0; index < 3; index++) {
      const lastFrame = this.frames.at(-1)!;
      const newFrame = this.rotate(lastFrame.body);
      this.frames.push(newFrame);
    }
  }

  private rotate(body: readonly number[][]) {
    const newBody: number[][] = [];
    const size = body[0].length - 1;
    for (let x = size, newBodyX = 0; x >= 0; x--, newBodyX++) {
      for (let y = 0; y < body.length; y++) {
        if (!Array.isArray(newBody[newBodyX])) newBody[newBodyX] = [];
        newBody[newBodyX][y] = body[y][x];
      }
    }
    return new Sprite(newBody);
  }

  next() {
    this.actualFrameIndex = (this.actualFrameIndex + 1) % this.frames.length;
    return this.frame;
  }

  prev() {
    this.actualFrameIndex = (this.actualFrameIndex - 1) % this.frames.length;
    return this.frame;
  }

  get frame() {
    return this.frames.at(this.actualFrameIndex)!;
  }

  get originalFrame() {
    return this.frames.at(0)!;
  }
}
