import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

export const GAME_MULTIVERSE = {
  ASCII: "ASCII",
  ["2D"]: "2D",
  ["3D"]: "3D",
} as const;

type TypeofGame_Mutliverse = typeof GAME_MULTIVERSE;

export type GameUniverses = TypeofGame_Mutliverse[keyof TypeofGame_Mutliverse];

interface UserConfigState {
  gameUniverse: GameUniverses;
  setGameUniverse: (universe: GameUniverses) => void;
}

export const useUserConfig = create(
  persist<UserConfigState>(
    (set, get) => ({
      gameUniverse: "2D",
      setGameUniverse: (u) => set({ gameUniverse: u }),
    }),
    {
      name: "user-config-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
