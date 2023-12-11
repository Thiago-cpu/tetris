"use client";
import { useEffect, useRef } from "react";
import { Game_2D } from "../2D/game_2D";

function useDrawPieceQueue(graphicEngine: Game_2D) {
  const pieceQueueCanvas = useRef<HTMLCanvasElement>(null);
  const requestId = useRef<number>();

  useEffect(() => {
    if (!window || !pieceQueueCanvas.current) return;
    pieceQueueCanvas.current.width = 4 * graphicEngine.blockSize;
    pieceQueueCanvas.current.height =
      graphicEngine.height * graphicEngine.blockSize;
    const ctx = pieceQueueCanvas.current.getContext("2d");
    if (!ctx) return;
    const update = () => {
      ctx.reset();
      graphicEngine.drawPieceQueue(ctx);

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

export function PieceQueueCanvas({
  graphicEngine,
}: {
  graphicEngine: Game_2D;
}) {
  const pieceQueueCanvas = useDrawPieceQueue(graphicEngine);
  return <canvas ref={pieceQueueCanvas} />;
}
