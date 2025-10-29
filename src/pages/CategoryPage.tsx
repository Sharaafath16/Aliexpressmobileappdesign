import { ArrowLeft, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { FilterSheet, FilterOptions } from "../components/FilterSheet";
import { SortSheet } from "../components/SortSheet";
import { categoryData } from "../data/categoryData";
import { products } from "../data/mockProducts";

interface CategoryPageProps {
  categoryId: string;
  onBack: () => void;
  onProductClick: (product: any) => void;
}

export function CategoryPage({ categoryId, onBack, onProductClick }: CategoryPageProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    categories: [],
    rating: 0,
    freeShipping: false,
  });

  const category = categoryData[categoryId as keyof typeof categoryData];

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center gap-3 border-b">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>{category.name}</h1>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={category.banner}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h2 className="text-2xl mb-2">{category.name}</h2>
            <p className="text-sm opacity-90">Discover amazing deals</p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="bg-white px-4 py-4">
        <h2 className="mb-3">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-3">
          {category.subcategories.map((subcategory, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">
                  {index === 0 ? "📱" : index === 1 ? "💻" : index === 2 ? "🎧" : "📷"}
                </span>
              </div>
              <span className="text-xs text-center line-clamp-2">{subcategory}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Deals */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="mb-3">Featured Deals</h2>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-2xl mb-1">🔥</p>
              <p className="text-xs">Up to</p>
              <p className="text-lg text-red-500">50% OFF</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="px-4 mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilterSheet(true)}
          className="flex-1 flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSortSheet(true)}
          className="flex-1 flex items-center gap-2"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </Button>
      </div>

      {/* Products Grid */}
      <div className="mt-4">
        <div className="px-4 py-3 bg-white">
          <h2>All Products</h2>
        </div>
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {products.map((product) => (
            <div key={product.id} onClick={() => onProductClick(product)}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      {/* Filter Sheet */}
      <FilterSheet
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        filters={filters}
        onApply={setFilters}
      />

      {/* Sort Sheet */}
      <SortSheet
        open={showSortSheet}
        onOpenChange={setShowSortSheet}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
      />
    </div>
  );
}
