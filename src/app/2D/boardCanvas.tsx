"use client";

import { useRef } from "react";
import { Game_2D } from "./game_2D";
import useDraw from "@/hooks/useDraw";

function useDrawBoard(graphicEngine: Game_2D) {
  const boardCanvas = useRef<HTMLCanvasElement>(null);

  useDraw((deltaTime) => {
    const ctx = boardCanvas.current?.getContext("2d");
    if (!ctx) return;
    graphicEngine.draw(ctx, deltaTime);
  });

  return boardCanvas;
}

export function BoardCanvas({ graphicEngine }: { graphicEngine: Game_2D }) {
  const boardCanvas = useDrawBoard(graphicEngine);

  return (
    <canvas
      ref={boardCanvas}
      width={graphicEngine.width * graphicEngine.blockSize}
      height={graphicEngine.height * graphicEngine.blockSize}
    />
  );
}
