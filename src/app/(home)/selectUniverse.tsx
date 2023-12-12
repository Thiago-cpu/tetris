"use client";
import {
  GameUniverses,
  gameUniverses,
  useUserConfig,
} from "../store/userConfig";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function SelectUniverse() {
  const [pending, startTransition] = useTransition();
  const { gameUniverse, setGameUniverse } = useUserConfig(
    ({ gameUniverse, setGameUniverse }) => ({ gameUniverse, setGameUniverse }),
  );

  const transitionateUniverse = (universe: GameUniverses) => () => {
    startTransition(() => setGameUniverse(universe));
  };

  return (
    <div className="absolute top-12 flex gap-8">
      {gameUniverses.map((universe) => (
        <Button
          disabled={pending}
          variant="outline"
          onClick={transitionateUniverse(universe)}
        >
          {universe}
        </Button>
      ))}
    </div>
  );
}
