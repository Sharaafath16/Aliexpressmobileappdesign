import { useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Store,
  Shield,
  Truck,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ReviewCard } from "../components/ReviewCard";
import { useCart } from "../context/CartContext";
import { mockReviews, specifications } from "../data/mockReviews";
import { toast } from "sonner@2.0.3";

interface ProductDetailProps {
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    sold: number;
    discount?: number;
  };
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const colors = ["Black", "White", "Blue", "Red"];
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: quantity,
      variant: `${selectedColor} - ${selectedSize}`,
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <button>
            <Share2 className="w-5 h-5" />
          </button>
          <button>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="relative aspect-square">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Price and Title */}
      <div className="bg-white px-4 py-4 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-red-500">US ${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <h1 className="text-lg mb-3">{product.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <span>{product.sold.toLocaleString()} sold</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white px-4 py-4 mt-2 space-y-3">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm">Free Shipping</p>
            <p className="text-xs text-gray-500">Estimated delivery: 7-15 days</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm">Buyer Protection</p>
            <p className="text-xs text-gray-500">Full refund if item not as described</p>
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div className="bg-white px-4 py-4 mt-2">
        <p className="text-sm mb-3">Color: {selectedColor}</p>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-lg border ${
                selectedColor === color
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="bg-white px-4 py-4 mt-2">
        <p className="text-sm mb-3">Size: {selectedSize}</p>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg border ${
                selectedSize === size
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="bg-white px-4 py-4 mt-2">
        <p className="text-sm mb-3">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mt-2">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="px-4 py-4 space-y-4">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </TabsContent>
          <TabsContent value="specs" className="px-4 py-4">
            <div className="space-y-3">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="text-gray-600">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-50">
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
