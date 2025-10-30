import { Star, ShoppingCart, Eye, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sold: number;
  discount?: number;
}

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  rating,
  sold,
  discount,
}: ProductCardProps) {
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 50) + 10);
  const isHot = sold > 1000;
  const isAlmostSoldOut = sold > 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 50) + 10);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
      <div className="relative aspect-square">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}
        {isHot && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 border-0">
            <Zap className="w-3 h-3 mr-1 fill-white" />
            HOT
          </Badge>
        )}
        {isAlmostSoldOut && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            Almost Sold Out!
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {viewers}
        </div>
      </div>
      <div className="p-3 space-y-2">
        <h3 className="line-clamp-2 text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-red-500">US ${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-xs">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span>{sold.toLocaleString()} sold</span>
        </div>
      </div>
    </div>
  );
}
