import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const allGameUniverses = ["ASCII", "2D", "3D"] as const;

export type GameUniverses = (typeof allGameUniverses)[number];

interface UserConfigState {
  randomMode: boolean;
  setRandomMode: (randomMode: boolean) => void;
  gameUniverse: GameUniverses;
  setGameUniverse: (universe: GameUniverses) => void;
}

const interval: {
  current?: NodeJS.Timeout;
} = { current: undefined };

export const useUserConfig = create<UserConfigState>((set, get) => ({
  gameUniverse: "2D",
  randomMode: false,
  setGameUniverse: (u) => set({ gameUniverse: u }),
  setRandomMode: (randomMode) => {
    if (interval.current) clearInterval(interval.current);
    if (!randomMode) return set({ randomMode });
    interval.current = setInterval(() => {
      set((state) => {
        const otherUniverses = allGameUniverses.filter(
          (u) => u !== state.gameUniverse,
        );
        const randomUniverse =
          otherUniverses[Math.floor(Math.random() * otherUniverses.length)];
        return { gameUniverse: randomUniverse };
      });
    }, 10 * 1000);
    set({ randomMode });
  },
}));
