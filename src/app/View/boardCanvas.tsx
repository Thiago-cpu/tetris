"use client";

import { useEffect, useRef } from "react";
import { GameCanvas } from "../core/gameCanvas";
import useDraw from "@/hooks/useDraw";

function useDrawBoard(game: GameCanvas) {
  const boardCanvas = useRef<HTMLCanvasElement>(null);
  const elapsedTimeRef = useRef(0);

  useDraw((deltaTime) => {
    const ctx = boardCanvas.current?.getContext("2d");
    if (!ctx) return;
    game.draw(ctx, deltaTime);
  });

  return boardCanvas;
}

export function BoardCanvas({ game }: { game: GameCanvas }) {
  const boardCanvas = useDrawBoard(game);

  return (
    <canvas
      ref={boardCanvas}
      width={game.width * game.blockSize}
      height={game.height * game.blockSize}
    />
  );
}
