import { useState } from "react";
import { ArrowLeft, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { FilterSheet, FilterOptions } from "../components/FilterSheet";
import { SortSheet } from "../components/SortSheet";
import { products } from "../data/mockProducts";

interface AllProductsPageProps {
  onBack: () => void;
  onProductClick: (product: any) => void;
}

export function AllProductsPage({ onBack, onProductClick }: AllProductsPageProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    categories: [],
    rating: 0,
    freeShipping: false,
  });

  const sortProducts = (productList: typeof products) => {
    const sorted = [...productList];
    switch (selectedSort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "popular":
        return sorted.sort((a, b) => b.sold - a.sold);
      default:
        return sorted;
    }
  };

  const filteredProducts = sortProducts(products);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">All Products</h1>
          </div>
          
          {/* Filter and Sort */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterSheet(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black"
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSortSheet(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>
      </div>

      {/* Product Count */}
      <div className="bg-white px-4 py-3 border-b">
        <p className="text-sm text-gray-600">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Products Grid */}
      <div className="px-4 pt-3 pb-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => onProductClick(product)}>
            <ProductCard {...product} />
          </div>
        ))}
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
