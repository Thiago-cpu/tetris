"use client";
import { GameUniverses, useUserConfig } from "../store/userConfig";
import dynamic from "next/dynamic";

const nameToUniverse: Record<GameUniverses, ReturnType<typeof dynamic>> = {
  "2D": dynamic(() => import("../2D/game2D"), { ssr: false }),
  "3D": dynamic(() => import("../3D/game3D"), { ssr: false }),
  ASCII: dynamic(() => import("../ASCII/gameASCII"), { ssr: false }),
} as const;

export default function GameMultiverse() {
  const gameUniverse = useUserConfig((state) => state.gameUniverse);
  const Universe = nameToUniverse[gameUniverse];

  return <Universe />;
}
