import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endTime?: Date;
  hours?: number;
}

export function CountdownTimer({ endTime, hours = 24 }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const end = endTime || new Date(Date.now() + hours * 60 * 60 * 1000);
    const difference = end.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 text-red-500" />
      <div className="flex items-center gap-1">
        <div className="bg-black text-white px-2 py-1 rounded text-sm min-w-[32px] text-center">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-sm">:</span>
        <div className="bg-black text-white px-2 py-1 rounded text-sm min-w-[32px] text-center">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-sm">:</span>
        <div className="bg-black text-white px-2 py-1 rounded text-sm min-w-[32px] text-center">
          {formatNumber(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
}
