"use client";
import { useEffect, useRef } from "react";
import { PieceQueue } from "./core/pieceQueue";
import { Game } from "./core/game";
import { PieceQueueCanvas } from "./View/pieceQueueCanvas";
import { BoardCanvas } from "./View/boardCanvas";
import { useEventListener } from "@/hooks/useEventListener";

const game = new Game();

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
