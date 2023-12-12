import GameMultiverse from "./GameMultiverse";
import SelectUniverse from "./selectUniverse";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center gap-8">
      <SelectUniverse />
      <GameMultiverse />
    </main>
  );
}
