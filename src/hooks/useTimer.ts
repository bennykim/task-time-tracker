import { minutesToSeconds } from "@/utils";
import { useEffect, useState } from "react";

export const useTimer = (duration: number) => {
  const [totalSeconds, setTotalSeconds] = useState(duration);
  const [seconds, setSeconds] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSeconds(duration);
    setTotalSeconds(duration);
    setIsActive(false);
  }, [duration]);

  useEffect(() => {
    const interval = isActive
      ? setInterval(() => {
          setSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0));
        }, 1000)
      : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(false);
    }
  }, [duration, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(duration);
    setTotalSeconds(duration);
    setIsActive(false);
  };

  const changeTimerDuration = (seconds: number) => {
    setSeconds((prev) => {
      const newSeconds = prev + minutesToSeconds(seconds);
      return newSeconds > 0 ? newSeconds : prev;
    });
    setTotalSeconds((prev) => {
      const newTotalSeconds = prev + minutesToSeconds(seconds);
      return newTotalSeconds > 0 ? newTotalSeconds : prev;
    });
  };

  return {
    seconds,
    isActive,
    totalSeconds,
    toggleTimer,
    resetTimer,
    changeTimerDuration,
  };
};
