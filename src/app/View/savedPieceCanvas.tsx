"use client";
import { useEffect, useRef } from "react";
import { GameCanvas } from "../core/gameCanvas";

function useDrawSavedPiece(game: GameCanvas) {
  const savedPieceCanvas = useRef<HTMLCanvasElement>(null);
  const requestId = useRef<number>();

  useEffect(() => {
    if (!window || !savedPieceCanvas.current) return;
    savedPieceCanvas.current.width = 4 * game.blockSize;
    savedPieceCanvas.current.height = game.height * game.blockSize;
    const ctx = savedPieceCanvas.current.getContext("2d");
    if (!ctx) return;
    const update = () => {
      ctx.reset();
      game.drawSavedPiece(ctx);

      requestId.current = requestAnimationFrame(update);
    };
    update();
    return () => {
      if (!requestId.current) return;
      cancelAnimationFrame(requestId.current);
    };
  }, []);

  return savedPieceCanvas;
}

export function SavedPieceCanvas({ game }: { game: GameCanvas }) {
  const pieceQueueCanvas = useDrawSavedPiece(game);
  return <canvas ref={pieceQueueCanvas} />;
}
