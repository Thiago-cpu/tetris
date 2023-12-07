"use client";

import { useEffect, useRef } from "react";
import { GameCanvas } from "../core/gameCanvas";

function useDrawBoard(game: GameCanvas) {
  const boardCanvas = useRef<HTMLCanvasElement>(null);
  const requestId = useRef<number>();
  const lastTimeRef = useRef(0);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    if (!window || !boardCanvas.current) return;
    boardCanvas.current.width = game.width * game.blockSize;
    boardCanvas.current.height = game.height * game.blockSize;
    const ctx = boardCanvas.current.getContext("2d");
    if (!ctx) return;
    const update = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - lastTimeRef.current;

      elapsedTimeRef.current += deltaTime;

      if (elapsedTimeRef.current >= 700) {
        game.gravity();
        elapsedTimeRef.current = 0;
      }
      ctx.reset();
      game.drawBoard(ctx);
      game.drawActualPiece(ctx);

      lastTimeRef.current = currentTime;
      requestId.current = requestAnimationFrame(update);
    };
    requestId.current = requestAnimationFrame(update);

    return () => {
      if (!requestId.current) return;
      cancelAnimationFrame(requestId.current);
    };
  }, []);

  return boardCanvas;
}

export function BoardCanvas({ game }: { game: GameCanvas }) {
  const boardCanvas = useDrawBoard(game);

  return <canvas ref={boardCanvas} />;
}
