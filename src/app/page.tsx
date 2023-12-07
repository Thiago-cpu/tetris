"use client";
import { PieceQueueCanvas } from "./View/pieceQueueCanvas";
import { BoardCanvas } from "./View/boardCanvas";
import { useEventListener } from "@/hooks/useEventListener";
import { GameCanvas } from "./core/gameCanvas";

const game = new GameCanvas();

export default function Home() {
  useEventListener("keydown", (e) => game.action(e.key));
  return (
    <main className="flex min-h-screen items-center justify-center gap-8 bg-background">
      <div style={{ width: 120 }} />
      <BoardCanvas game={game} />
      <PieceQueueCanvas game={game} />
    </main>
  );
}
