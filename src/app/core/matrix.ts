export class Matrix<T> extends Array<Array<T>> {
  constructor(data: T[][]);
  constructor(initialRows: number, initialCols: number, defaultValue: T);
  constructor(arg1: T[][] | number, initialCols?: number, defaultValue?: T) {
    const initialRows = Array.isArray(arg1) ? arg1.length : arg1;
    super(initialRows);
    if (Array.isArray(arg1)) {
      for (let i = 0; i < arg1.length; i++) {
        this[i] = [...arg1[i]];
      }
      return;
    }
    if (typeof initialCols === "number" && typeof defaultValue === "number") {
      for (let i = 0; i < initialRows; i++) {
        this[i] = new Array<T>(initialCols).fill(defaultValue);
      }
    }
  }

  forEachValue(callback: (value: T, x: number, y: number) => void): void {
    super.forEach((row, y) => row.forEach((value, x) => callback(value, x, y)));
  }

  everyValue(callback: (value: T, x: number, y: number) => void): boolean {
    return super.every((row, y) =>
      row.every((value, x) => callback(value, x, y)),
    );
  }

  get rows() {
    return this.length;
  }

  get cols() {
    return this[0].length;
  }

  static rotate<T>(matrix: Matrix<T>): Matrix<T> {
    const newBody: T[][] = [];
    const size = matrix.cols - 1;
    for (let x = size, newBodyX = 0; x >= 0; x--, newBodyX++) {
      for (let y = 0; y < matrix.rows; y++) {
        if (!Array.isArray(newBody[newBodyX])) newBody[newBodyX] = [];
        newBody[newBodyX][y] = matrix[y][x];
      }
    }
    return new Matrix(newBody);
  }
}
