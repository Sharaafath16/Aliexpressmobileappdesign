import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FlashDealCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
}

export function FlashDealCard({
  image,
  title,
  price,
  originalPrice,
  discount,
}: FlashDealCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm w-[135px] flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </div>
      </div>
      <div className="p-2.5 space-y-1">
        <p className="text-sm line-clamp-1">{title}</p>
        <div className="flex flex-col gap-0.5">
          <span className="text-red-500 text-sm">US ${price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-xs">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
