import { useEffect, useRef } from "react";

export default function useDraw(draw: (deltaTime: number) => void) {
  const requestId = useRef<number>();
  const lastTimeRef = useRef(0);
  useEffect(() => {
    if (!window) return;
    const update = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - lastTimeRef.current;
      draw(deltaTime);
      lastTimeRef.current = currentTime;
      requestId.current = requestAnimationFrame(update);
    };
    requestId.current = requestAnimationFrame(update);
    return () => {
      if (!requestId.current) return;
      cancelAnimationFrame(requestId.current);
    };
  }, []);
}
