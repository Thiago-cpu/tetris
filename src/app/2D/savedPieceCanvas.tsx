"use client";
import { useEffect, useRef } from "react";
import { Game_2D } from "./game_2D";

function useDrawSavedPiece(game: Game_2D) {
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

export function SavedPieceCanvas({
  graphicEngine: game,
}: {
  graphicEngine: Game_2D;
}) {
  const pieceQueueCanvas = useDrawSavedPiece(game);
  return <canvas ref={pieceQueueCanvas} />;
}
