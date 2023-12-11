"use client";
import { useState } from "react";
import Game3D from "./3D/game3D";
import Game2D from "./2D/game2D";
import { Button } from "@/components/ui/button";
import { Game } from "./core/game";

const game = new Game();

export default function Home() {
  const [render3DGame, setShouldRender3DGame] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center gap-8">
      <Button
        variant="outline"
        className="absolute top-5"
        onClick={(e) => {
          // console.log({ e });
          e.currentTarget.blur();
          e.preventDefault();
          setShouldRender3DGame((p) => !p);
        }}
      >
        {render3DGame ? "2D" : "3D"}
      </Button>
      {render3DGame ? (
        <Game3D gameEngine={game} />
      ) : (
        <Game2D gameEngine={game} />
      )}
    </main>
  );
}
