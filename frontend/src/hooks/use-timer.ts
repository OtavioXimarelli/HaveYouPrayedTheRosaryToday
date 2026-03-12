import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(initialDurationMs: number) {
  const [remainingMs, setRemainingMs] = useState(initialDurationMs);
  const [isRunning, setIsRunning] = useState(false);
  const targetTimeRef = useRef<number | null>(null);
  const durationRef = useRef<number>(initialDurationMs);

  const start = useCallback(() => {
    if (isRunning) return;
    targetTimeRef.current = Date.now() + remainingMs;
    durationRef.current = remainingMs;
    setIsRunning(true);
  }, [isRunning, remainingMs]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    targetTimeRef.current = null;
  }, [isRunning]);

  const reset = useCallback((newDurationMs?: number) => {
    setIsRunning(false);
    targetTimeRef.current = null;
    if (newDurationMs !== undefined) {
      durationRef.current = newDurationMs;
    }
    setRemainingMs(durationRef.current);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    let animationFrameId: number;

    const tick = () => {
      if (!targetTimeRef.current) return;
      const now = Date.now();
      const timeLeft = targetTimeRef.current - now;

      if (timeLeft <= 0) {
        setRemainingMs(0);
        setIsRunning(false);
        targetTimeRef.current = null;
        return; // Complete
      }

      setRemainingMs(timeLeft);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  return { remainingMs, isRunning, start, pause, reset, duration: durationRef.current };
}
