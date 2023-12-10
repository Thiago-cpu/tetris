"use client";

import React, { useEffect, useRef } from "react";
import { Game_3D } from "./game_3D";
import { useEventListener } from "@/hooks/useEventListener";
import useDraw from "@/hooks/useDraw";

export default function Page() {
  const gameRef = useRef<Game_3D | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  useEventListener("keydown", (e) => gameRef.current?.game.action(e.key));

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window) return;
    const game = new Game_3D();
    gameRef.current = game;

    game.world.setup(container);
    return () => {
      game.world.cleanup(container);
    };
  }, []);

  useDraw((deltaTime) => {
    const game = gameRef.current;
    if (!game) return;
    game.draw(deltaTime);
  });

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen items-center justify-center gap-8"
    ></main>
  );
}
