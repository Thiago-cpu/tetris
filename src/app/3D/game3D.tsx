"use client";

import React, { useEffect, useRef } from "react";
import { Game_3D } from "./game_3D";
import { useEventListener } from "@/hooks/useEventListener";
import useDraw from "@/hooks/useDraw";
import { useGameEngine } from "../store/gameEngine";

export default function Game3D() {
  const game = useGameEngine();
  const graphicEngineRef = useRef<Game_3D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEventListener(
    "keydown",
    (e) => graphicEngineRef.current?.game.action(e.key),
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window) return;
    const graphicEngine = new Game_3D(game);
    graphicEngineRef.current = graphicEngine;

    graphicEngine.world.setup(container);
    return () => {
      graphicEngine.world.cleanup(container);
    };
  }, [game]);

  useDraw((deltaTime) => {
    const graphicEngine = graphicEngineRef.current;
    if (!graphicEngine) return;
    graphicEngine.draw(deltaTime);
  });

  return <div ref={containerRef}></div>;
}
