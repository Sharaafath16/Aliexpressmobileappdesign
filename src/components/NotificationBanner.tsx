import { motion, AnimatePresence } from "motion/react";
import { X, Gift, TrendingUp, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface Notification {
  id: number;
  type: "deal" | "trending" | "flash" | "reward";
  message: string;
  action?: string;
}

const notifications: Notification[] = [
  { id: 1, type: "flash", message: "⚡ Flash Sale! 50% OFF Electronics - Limited Time", action: "Shop Now" },
  { id: 2, type: "deal", message: "🎁 New coupon available: $10 OFF your next order", action: "Claim" },
  { id: 3, type: "trending", message: "🔥 Trending Now: Wireless Earbuds - 1000+ sold today", action: "View" },
  { id: 4, type: "reward", message: "⭐ You've earned 100 points! Redeem for rewards", action: "Redeem" },
];

export function NotificationBanner() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const notification = notifications[currentNotification];

  const getIcon = () => {
    switch (notification.type) {
      case "flash":
        return <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
      case "deal":
        return <Gift className="w-4 h-4 text-green-400" />;
      case "trending":
        return <TrendingUp className="w-4 h-4 text-orange-400" />;
      case "reward":
        return <Star className="w-4 h-4 text-purple-400 fill-purple-400" />;
    }
  };

  const getBackground = () => {
    switch (notification.type) {
      case "flash":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "deal":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "trending":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "reward":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${getBackground()} text-white overflow-hidden`}
        >
          <div className="px-4 py-2 flex items-center gap-2">
            <div className="flex-shrink-0">{getIcon()}</div>
            <p className="flex-1 text-sm truncate">{notification.message}</p>
            {notification.action && (
              <button className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 backdrop-blur-sm whitespace-nowrap">
                {notification.action}
              </button>
            )}
            <button
              onClick={() => setIsDismissed(true)}
              className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
