import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Eye, ShoppingCart, Package, MapPin } from "lucide-react";

interface Activity {
  id: number;
  type: "view" | "purchase" | "delivery";
  message: string;
  location?: string;
  time: string;
}

const activities: Activity[] = [
  { id: 1, type: "purchase", message: "Sarah from New York just purchased", location: "New York, USA", time: "2m ago" },
  { id: 2, type: "view", message: "124 people are viewing this product", time: "now" },
  { id: 3, type: "purchase", message: "Michael from London just purchased", location: "London, UK", time: "5m ago" },
  { id: 4, type: "delivery", message: "Order delivered to Tokyo", location: "Tokyo, Japan", time: "8m ago" },
  { id: 5, type: "purchase", message: "Emma from Paris just purchased", location: "Paris, France", time: "12m ago" },
  { id: 6, type: "view", message: "89 people are viewing this product", time: "now" },
];

export function LiveActivity() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  const getIcon = () => {
    switch (activity.type) {
      case "purchase":
        return <ShoppingCart className="w-4 h-4" />;
      case "view":
        return <Eye className="w-4 h-4" />;
      case "delivery":
        return <Package className="w-4 h-4" />;
    }
  };

  const getColor = () => {
    switch (activity.type) {
      case "purchase":
        return "bg-green-500";
      case "view":
        return "bg-blue-500";
      case "delivery":
        return "bg-orange-500";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center gap-3"
        >
          <div className={`w-8 h-8 rounded-full ${getColor()} flex items-center justify-center text-white`}>
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{activity.message}</p>
            {activity.location && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{activity.location}</span>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
