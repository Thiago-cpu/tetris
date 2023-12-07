"use client";
import { useEffect, useRef } from "react";
import { GameCanvas } from "../core/gameCanvas";

function useDrawPieceQueue(game: GameCanvas) {
  const pieceQueueCanvas = useRef<HTMLCanvasElement>(null);
  const requestId = useRef<number>();

  useEffect(() => {
    if (!window || !pieceQueueCanvas.current) return;
    pieceQueueCanvas.current.width = 4 * game.blockSize;
    pieceQueueCanvas.current.height = game.height * game.blockSize;
    const ctx = pieceQueueCanvas.current.getContext("2d");
    if (!ctx) return;
    const update = () => {
      ctx.reset();
      game.drawPieceQueue(ctx);

      requestId.current = requestAnimationFrame(update);
    };
    update();
    return () => {
      if (!requestId.current) return;
      cancelAnimationFrame(requestId.current);
    };
  }, []);

  return pieceQueueCanvas;
}

export function PieceQueueCanvas({ game }: { game: GameCanvas }) {
  const pieceQueueCanvas = useDrawPieceQueue(game);
  return <canvas ref={pieceQueueCanvas} />;
}