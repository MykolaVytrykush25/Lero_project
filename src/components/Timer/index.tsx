"use client";

import { useEffect, useState } from "react";
import cn from "classnames";

//styles
import styles from "./Timer.module.scss";

type TTimerProps = {
  secondsToEnd: number;
  totalTime: number;
  className?: string;
  onProgress?: (progress: number) => void;
};

const Timer: React.FC<TTimerProps> = ({ secondsToEnd, totalTime, className, onProgress }) => {
  const [timeLeft, setTimeLeft] = useState(secondsToEnd);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updatedTime = Math.max(prev - 1, 0);

        const progress = ((totalTime - updatedTime) / totalTime) * 100;
        if (onProgress) {
          onProgress(progress);
        }

        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime, onProgress]);

  return (
    <p className={cn(styles.timer, className, timeLeft <= 0 ? styles.timer__expired : "")}>
      {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
    </p>
  );
};

export default Timer;
