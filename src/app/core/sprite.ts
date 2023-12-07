import { Matrix } from "./matrix";

export class Sprite {
  body: Matrix<number>;
  constructor(body: Matrix<number>) {
    this.body = body;
  }
}
