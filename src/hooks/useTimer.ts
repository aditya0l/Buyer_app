import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialSeconds: number, onTimeUp?: () => void) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const callbackRef = useRef(onTimeUp);

  useEffect(() => {
    callbackRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (callbackRef.current) callbackRef.current();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (callbackRef.current) callbackRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = () => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const formattedMins = minutes.toString().padStart(2, '0');
    const formattedSecs = seconds.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${formattedMins}:${formattedSecs}`;
    }
    return `${formattedMins}:${formattedSecs} Min`;
  };

  return {
    secondsLeft,
    formattedTime: formatTime(),
    isCritical: secondsLeft < 300, // < 5 mins
  };
};
