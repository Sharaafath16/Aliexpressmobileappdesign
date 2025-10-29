import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { allCategories } from "../data/categoryData";

interface CategoriesProps {
  onBack: () => void;
  onCategoryClick: (categoryId: string) => void;
}

export function Categories({ onBack, onCategoryClick }: CategoriesProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 border-b">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Categories</h1>
        </div>
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search categories..."
              className="pl-10 pr-4 bg-gray-50 border-0"
            />
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {allCategories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.itemCount} items</p>
            </button>
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div className="bg-white mt-2">
        <div className="px-4 py-3 border-b">
          <h2>All Categories</h2>
        </div>
        <div className="divide-y">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.itemCount} items</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div className="bg-white mt-2 px-4 py-4 mb-4">
        <h2 className="mb-3">Trending Searches</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Wireless Earbuds",
            "Smart Watch",
            "Phone Case",
            "Laptop Stand",
            "LED Lights",
            "Backpack",
            "Sunglasses",
            "Yoga Mat",
          ].map((term) => (
            <button
              key={term}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
