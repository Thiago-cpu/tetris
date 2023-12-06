import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constrain(start: number, value: number, end: number) {
  return Math.max(Math.min(value, end), start);
}
