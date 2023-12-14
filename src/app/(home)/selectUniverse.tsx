"use client";
import {
  GameUniverses,
  allGameUniverses,
  useUserConfig,
} from "../store/userConfig";
import { useId, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function RandomMode() {
  const id = useId();
  const [pending, startTransition] = useTransition();
  const { randomMode, setRandomMode } = useUserConfig();
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={randomMode}
        onCheckedChange={(checked) =>
          startTransition(() => setRandomMode(checked))
        }
        onClick={(e) => e.currentTarget.blur()}
        id={id}
        disabled={pending}
      />
      <Label htmlFor={id}>Random Mode</Label>
    </div>
  );
}

export default function GameConfig() {
  const [pending, startTransition] = useTransition();
  const setGameUniverse = useUserConfig((state) => state.setGameUniverse);
  const randomMode = useUserConfig((state) => state.randomMode);

  const transitionateUniverse = (universe: GameUniverses) => () => {
    startTransition(() => setGameUniverse(universe));
  };

  return (
    <div className="absolute top-12 flex gap-8">
      {allGameUniverses.map((universe) => (
        <Button
          key={universe}
          disabled={pending || randomMode}
          variant="outline"
          onClick={transitionateUniverse(universe)}
        >
          {universe}
        </Button>
      ))}
      <RandomMode />
    </div>
  );
}
