import { AlertTriangle, TrendingUp, Package } from "lucide-react";
import { motion } from "motion/react";

interface StockAlertProps {
  stock: number;
  threshold?: number;
  totalSold?: number;
}

export function StockAlert({ stock, threshold = 20, totalSold }: StockAlertProps) {
  const isLowStock = stock <= threshold;
  const stockPercentage = Math.min((stock / 100) * 100, 100);

  return (
    <div className="space-y-2">
      {isLowStock && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2"
        >
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-orange-700">
            Only <strong>{stock}</strong> left in stock!
          </span>
        </motion.div>
      )}

      {totalSold && totalSold > 100 && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-700">
            <strong>{totalSold}+</strong> sold in last 24h
          </span>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            <span>Stock Status</span>
          </div>
          <span className={stock < threshold ? "text-orange-600" : "text-green-600"}>
            {stock} available
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stockPercentage}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${
              stock < threshold ? "bg-orange-500" : "bg-green-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
