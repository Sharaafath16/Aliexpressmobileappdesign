import { Home, Grid, Package, User } from "lucide-react";

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount?: number;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "categories", label: "Categories", icon: Grid },
    { id: "orders", label: "Orders", icon: Package },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 ${
                isActive ? "text-red-500" : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
