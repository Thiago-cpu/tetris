"use client";
import { useEventListener } from "@/hooks/useEventListener";
import { Game_2D } from "./game_2D";
import { SavedPieceCanvas } from "./savedPieceCanvas";
import { BoardCanvas } from "./boardCanvas";
import { PieceQueueCanvas } from "./pieceQueueCanvas";
import { useGameEngine } from "../store/gameEngine";

export default function Game2D() {
  const game = useGameEngine();
  const graphicEngine = new Game_2D(game);
  useEventListener("keydown", (e) => graphicEngine.game.action(e.key));
  return (
    <>
      <SavedPieceCanvas graphicEngine={graphicEngine} />
      <BoardCanvas graphicEngine={graphicEngine} />
      <PieceQueueCanvas graphicEngine={graphicEngine} />
    </>
  );
}
