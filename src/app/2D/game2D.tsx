"use client";
import { useEventListener } from "@/hooks/useEventListener";
import { Game_2D } from "./game_2D";
import { SavedPieceCanvas } from "../View/savedPieceCanvas";
import { BoardCanvas } from "../View/boardCanvas";
import { PieceQueueCanvas } from "../View/pieceQueueCanvas";
import { useRef } from "react";
import { Game } from "../core/game";

interface Game3DProps {
  gameEngine: Game;
}

export default function Game2D({ gameEngine }: Game3DProps) {
  const gameRef = useRef<Game_2D>(new Game_2D(gameEngine));
  useEventListener("keydown", (e) => gameRef.current.game.action(e.key));
  return (
    <>
      <SavedPieceCanvas graphicEngine={gameRef.current} />
      <BoardCanvas graphicEngine={gameRef.current} />
      <PieceQueueCanvas graphicEngine={gameRef.current} />
    </>
  );
}
