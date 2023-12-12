import { create } from "zustand";
import { Game } from "../core/game";

export const useGameEngine = create<Game>()(() => new Game());
