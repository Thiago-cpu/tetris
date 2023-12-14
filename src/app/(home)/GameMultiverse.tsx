"use client";
import Game2D from "../2D/game2D";
import Game3D from "../3D/game3D";
import GameASCII from "../ASCII/gameASCII";
import { GameUniverses, useUserConfig } from "../store/userConfig";

const nameToUniverse: Record<GameUniverses, () => JSX.Element> = {
  "2D": Game2D,
  "3D": Game3D,
  ASCII: GameASCII,
} as const;

export default function GameMultiverse() {
  const gameUniverse = useUserConfig((state) => state.gameUniverse);
  const Universe = nameToUniverse[gameUniverse];

  return <Universe />;
}
