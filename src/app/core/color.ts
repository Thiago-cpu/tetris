export class Color {
  static brightenColorHex(color: string, percent: number) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const newR = Math.min(255, r + (percent / 100) * 255);
    const newG = Math.min(255, g + (percent / 100) * 255);
    const newB = Math.min(255, b + (percent / 100) * 255);

    return `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG)
      .toString(16)
      .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
  }
}
