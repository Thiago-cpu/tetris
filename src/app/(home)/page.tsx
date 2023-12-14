import GameMultiverse from "./GameMultiverse";
import GameConfig from "./selectUniverse";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center gap-8">
      <GameConfig />
      <GameMultiverse />
    </main>
  );
}
