"use client";
import { PieceQueueCanvas } from "./View/pieceQueueCanvas";
import { BoardCanvas } from "./View/boardCanvas";
import { useEventListener } from "@/hooks/useEventListener";
import { Game_2D } from "./2D/game_2D";
import { SavedPieceCanvas } from "./View/savedPieceCanvas";

const game = new Game_2D();

export default function Home() {
  useEventListener("keydown", (e) => game.action(e.key));
  return (
    <main className="flex min-h-screen items-center justify-center gap-8">
      <SavedPieceCanvas game={game} />
      <BoardCanvas game={game} />
      <PieceQueueCanvas game={game} />
    </main>
  );
}
