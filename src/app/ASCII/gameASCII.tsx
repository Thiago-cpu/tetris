"use client";
import { useEventListener } from "@/hooks/useEventListener";
import { useGameEngine } from "../store/gameEngine";
import game_ASCII from "./game_ASCII";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import useDraw from "@/hooks/useDraw";
import { useRef } from "react";

export default function GameASCII() {
  const game = useGameEngine();
  const savedPieceRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const graphicEngineRef = useRef<game_ASCII | null>(null);
  useEventListener(
    "keydown",
    (e) => graphicEngineRef.current?.game.action(e.key),
  );
  useDraw((deltaTime) => {
    if (!graphicEngineRef.current) return;
    graphicEngineRef.current.draw(deltaTime);
  });

  useIsomorphicLayoutEffect(() => {
    if (!boardRef.current || !savedPieceRef.current || !queueRef.current)
      return;
    graphicEngineRef.current = new game_ASCII(game, {
      board: boardRef.current,
      queue: queueRef.current,
      savedPiece: savedPieceRef.current,
    });
  }, [game]);

  return (
    <div className="flex gap-12 text-lg text-[#2cd031]">
      <div ref={savedPieceRef} />
      <div ref={boardRef} />
      <div ref={queueRef} />
    </div>
  );
}
