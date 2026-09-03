import { useCallback, useEffect, useRef, useState } from "react";

function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

const reset = useCallback(() => {
  setRunning(false);
  setSeconds(initialSeconds);
  clearInterval(intervalRef.current);
  intervalRef.current = null;
}, [initialSeconds]);

  return {
    seconds,
    running,
    start,
    pause,
    reset,
  };
}

export default useTimer;