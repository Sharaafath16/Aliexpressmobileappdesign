import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}
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
