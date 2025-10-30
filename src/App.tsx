import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Home,
  Tag,
  ShoppingBag,
  User,
  Smartphone,
  Shirt,
  Sparkles,
  Zap,
  Gift,
  Heart,
  Bell,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ProductCard } from "./components/ProductCard";
import { CategoryPill } from "./components/CategoryPill";
import { FlashDealCard } from "./components/FlashDealCard";
import { FilterSheet, FilterOptions } from "./components/FilterSheet";
import { SortSheet } from "./components/SortSheet";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Categories } from "./pages/Categories";
import { Orders } from "./pages/Orders";
import { Account } from "./pages/Account";
import { CategoryPage } from "./pages/CategoryPage";
import { AdminPanel } from "./pages/AdminPanel";
import { CartProvider, useCart } from "./context/CartContext";
import { Toaster } from "./components/ui/sonner";
import { getProducts, getFlashDeals } from "./services/productService";
import { Product } from "./lib/supabase";

type Page = "home" | "product-detail" | "cart" | "checkout" | "categories" | "orders" | "account" | "category-page" | "admin";

function AppContent() {
  const { getCartCount } = useCart();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    categories: [],
    rating: 0,
    freeShipping: false,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [flashDeals, setFlashDeals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const [productsData, flashDealsData] = await Promise.all([
      getProducts(),
      getFlashDeals(),
    ]);
    setProducts(productsData);
    setFlashDeals(flashDealsData);
    setIsLoading(false);
  }

  const categories = [
    { id: "all", icon: <Sparkles className="w-6 h-6" />, label: "All" },
    { id: "electronics", icon: <Smartphone className="w-6 h-6" />, label: "Electronics" },
    { id: "fashion", icon: <Shirt className="w-6 h-6" />, label: "Fashion" },
    { id: "beauty", icon: <Heart className="w-6 h-6" />, label: "Beauty" },
    { id: "sports", icon: <Zap className="w-6 h-6" />, label: "Sports" },
    { id: "toys", icon: <Gift className="w-6 h-6" />, label: "Toys" },
  ];

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  const handleCartClick = () => {
    setCurrentPage("cart");
  };

  const handleCheckoutClick = () => {
    setCurrentPage("checkout");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setActiveTab("home");
  };

  const handleOrderComplete = () => {
    setCurrentPage("home");
    setActiveTab("orders");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage("category-page");
  };

  const sortProducts = (productList: Product[]) => {
    const sorted = [...productList];
    switch (selectedSort) {
      case "price-low":
        return sorted.sort((a, b) => Number(a.price) - Number(b.price));
      case "price-high":
        return sorted.sort((a, b) => Number(b.price) - Number(a.price));
      case "rating":
        return sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
      case "popular":
        return sorted.sort((a, b) => b.sold - a.sold);
      default:
        return sorted;
    }
  };

  const filteredProducts = sortProducts(products);

  // Admin Panel
  if (currentPage === "admin") {
    return <AdminPanel onLogout={handleBackToHome} />;
  }

  // Product Detail
  if (currentPage === "product-detail" && selectedProduct) {
    return (
      <ProductDetail product={selectedProduct} onBack={handleBackToHome} />
    );
  }

  // Cart
  if (currentPage === "cart") {
    return <Cart onBack={handleBackToHome} onCheckout={handleCheckoutClick} />;
  }

  // Checkout
  if (currentPage === "checkout") {
    return <Checkout onBack={() => setCurrentPage("cart")} onComplete={handleOrderComplete} />;
  }

  // Categories
  if (currentPage === "categories") {
    return <Categories onBack={handleBackToHome} onCategoryClick={handleCategoryClick} />;
  }

  // Orders
  if (currentPage === "orders") {
    return <Orders onBack={handleBackToHome} />;
  }

  // Account
  if (currentPage === "account") {
    return <Account onBack={handleBackToHome} />;
  }

  // Category Page
  if (currentPage === "category-page" && selectedCategoryId) {
    return (
      <CategoryPage
        categoryId={selectedCategoryId}
        onBack={handleBackToHome}
        onProductClick={handleProductClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white sticky top-0 z-50">
        <div className="p-4 space-y-3">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <h1 onClick={() => {
              const clicks = (window as any).adminClicks || 0;
              (window as any).adminClicks = clicks + 1;
              if ((window as any).adminClicks >= 5) {
                setCurrentPage("admin");
                (window as any).adminClicks = 0;
              }
            }}>AliExpress</h1>
            <div className="flex items-center gap-4">
              <button>
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={handleCartClick} className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black px-1.5 py-0.5 text-xs min-w-[20px] h-[20px] flex items-center justify-center">
                    {getCartCount()}
                  </Badge>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 pr-4 bg-white text-black border-0"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 overflow-x-auto">
        <div className="flex gap-4">
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              icon={category.icon}
              label={category.label}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <h2>Super Deals</h2>
          <p className="text-sm opacity-90 mt-1">Up to 50% OFF on selected items</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full mt-4 text-sm">
            Shop Now
          </button>
        </div>
      </div>

      {/* Flash Deals */}
      <div className="mt-4 bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2>Flash Deals</h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-red-500">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="px-4 pb-4 overflow-x-auto">
          <div className="flex gap-3">
            {flashDeals.map((deal) => (
              <div key={deal.id} onClick={() => handleProductClick(deal)}>
                <FlashDealCard {...deal} />
              </div>
            ))}
          </div>
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

      {/* Just For You */}
      <div className="mt-4">
        <div className="px-4 py-3 bg-white">
          <h2>Just For You</h2>
        </div>
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => {
              setActiveTab("home");
              setCurrentPage("home");
            }}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "home" ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("categories");
              setCurrentPage("categories");
            }}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "categories" ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Tag className="w-5 h-5" />
            <span className="text-xs">Categories</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("orders");
              setCurrentPage("orders");
            }}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "orders" ? "text-red-500" : "text-gray-500"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("account");
              setCurrentPage("account");
            }}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === "account" ? "text-red-500" : "text-gray-500"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Account</span>
          </button>
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

export default function App() {
  return (
    <CartProvider>
      <AppContent />
      <Toaster />
    </CartProvider>
  );
}
