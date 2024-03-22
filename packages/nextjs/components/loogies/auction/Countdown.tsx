import { useEffect, useState } from "react";

type CountdownProps = {
  deadline: string;
};

export const Countdown: React.FC<CountdownProps> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const countdownTimer = () => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const timeDifference = end - now;

      if (timeDifference <= 0) {
        console.log("closed");
        setTimeLeft(`00h:00m`);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(countdownTimer, [deadline]);

  return <div className="text-3xl font-bold">{timeLeft}</div>;
};
