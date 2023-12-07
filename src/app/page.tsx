"use client";
import { PieceQueueCanvas } from "./View/pieceQueueCanvas";
import { BoardCanvas } from "./View/boardCanvas";
import { useEventListener } from "@/hooks/useEventListener";
import { GameCanvas } from "./core/gameCanvas";
import { SavedPieceCanvas } from "./View/savedPieceCanvas";

const game = new GameCanvas();

export default function Home() {
  useEventListener("keydown", (e) => game.action(e.key));
  return (
    <main className="flex min-h-screen items-center justify-center gap-8 bg-background">
      <SavedPieceCanvas game={game} />
      <BoardCanvas game={game} />
      <PieceQueueCanvas game={game} />
    </main>
  );
}
