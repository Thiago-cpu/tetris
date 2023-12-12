"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GAME_MULTIVERSE,
  GameUniverses,
  useUserConfig,
} from "../store/userConfig";
import { useTransition } from "react";

export default function SelectUniverse() {
  const [pending, startTransition] = useTransition();
  const { gameUniverse, setGameUniverse } = useUserConfig(
    ({ gameUniverse, setGameUniverse }) => ({ gameUniverse, setGameUniverse }),
  );
  return (
    <Select
      disabled={pending}
      value={gameUniverse}
      onValueChange={(v: GameUniverses) =>
        startTransition(() => setGameUniverse(v))
      }
    >
      <SelectTrigger className="absolute top-5 w-[100px]" value={gameUniverse}>
        <SelectValue placeholder="Tetris" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={GAME_MULTIVERSE["ASCII"]}>ASCII</SelectItem>
        <SelectItem value={GAME_MULTIVERSE["2D"]}>2D</SelectItem>
        <SelectItem value={GAME_MULTIVERSE["3D"]}>3D</SelectItem>
      </SelectContent>
    </Select>
  );
}
