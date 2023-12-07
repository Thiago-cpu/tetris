import { Matrix } from "./matrix";

interface BoardProps {
  width: number;
  height: number;
}

const defaultProps: BoardProps = { width: 10, height: 20 };

export class Board {
  body: Matrix<number>;
  width: number;
  height: number;

  constructor(props: BoardProps = defaultProps) {
    const { width, height } = props;
    this.width = width;
    this.height = height;
    this.body = new Matrix(this.height, this.width, 0);
  }

  reset() {
    this.body = new Matrix(this.height, this.width, 0);
  }

  validChunk(
    chunk: Matrix<number>,
    initialX: number,
    initialY: number,
  ): boolean {
    return chunk.everyValue((v, relativeX, relativeY) => {
      const y = initialY + relativeY;
      const x = initialX + relativeX;
      return (
        v === 0 || this.body[initialY + relativeY]?.[initialX + relativeX] === 0
      );
    });
  }

  setChunk(chunk: Matrix<number>, initialX: number, initialY: number): boolean {
    if (!this.validChunk(chunk, initialX, initialY)) return false;
    chunk.forEachValue((v, relativeX, relativeY) => {
      if (v === 0) return;
      this.body[initialY + relativeY][initialX + relativeX] = v;
    });
    this.removeSuccessRows();
    return true;
  }

  removeSuccessRows() {
    const newBody = [];
    this.body.forEach(
      (row) => row.some((value) => value === 0) && newBody.push(row),
    );
    while (newBody.length < this.body.rows) {
      newBody.unshift(new Array<number>(this.width).fill(0));
    }
    this.body = new Matrix(newBody);
  }
}
