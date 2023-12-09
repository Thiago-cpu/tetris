"use client";

import { useEffect, useRef } from "react";
import { Game_2D } from "../2D/game_2D";
import useDraw from "@/hooks/useDraw";

function useDrawBoard(game: Game_2D) {
  const boardCanvas = useRef<HTMLCanvasElement>(null);

  useDraw((deltaTime) => {
    const ctx = boardCanvas.current?.getContext("2d");
    if (!ctx) return;
    game.draw(ctx, deltaTime);
  });

  return boardCanvas;
}

export function BoardCanvas({ game }: { game: Game_2D }) {
  const boardCanvas = useDrawBoard(game);

  return (
    <canvas
      ref={boardCanvas}
      width={game.width * game.blockSize}
      height={game.height * game.blockSize}
    />
  );
}
