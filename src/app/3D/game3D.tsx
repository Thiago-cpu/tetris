"use client";

import React, { useEffect, useRef } from "react";
import { Game_3D } from "./game_3D";
import { useEventListener } from "@/hooks/useEventListener";
import useDraw from "@/hooks/useDraw";
import { Game } from "../core/game";

interface Game3DProps {
  gameEngine: Game;
}

export default function Game3D({ gameEngine }: Game3DProps) {
  const gameRef = useRef<Game_3D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEventListener("keydown", (e) => gameRef.current?.game.action(e.key));

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window) return;
    const game = new Game_3D(gameEngine);
    gameRef.current = game;

    game.world.setup(container);
    return () => {
      game.world.cleanup(container);
    };
  }, [gameEngine]);

  useDraw((deltaTime) => {
    const game = gameRef.current;
    if (!game) return;
    game.draw(deltaTime);
  });

  return <div ref={containerRef}></div>;
}
