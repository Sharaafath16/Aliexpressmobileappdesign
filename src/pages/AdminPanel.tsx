import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Image,
  Bell,
  Video,
  Tag,
} from "lucide-react";
import { AdminDashboard } from "./admin/AdminDashboard";
import { AdminProducts } from "./admin/AdminProducts";
import { AdminOrders } from "./admin/AdminOrders";
import { AdminUsers } from "./admin/AdminUsers";
import { AdminBanners } from "./admin/AdminBanners";
import { AdminNotifications } from "./admin/AdminNotifications";
import { AdminVideos } from "./admin/AdminVideos";
import { AdminCategories } from "./admin/AdminCategories";

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "banners", label: "Banners", icon: Image },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "videos", label: "Videos", icon: Video },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
      case "users":
        return <AdminUsers />;
      case "categories":
        return <AdminCategories />;
      case "banners":
        return <AdminBanners />;
      case "notifications":
        return <AdminNotifications />;
      case "videos":
        return <AdminVideos />;
      case "analytics":
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Analytics page coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Settings page coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg"></div>
              <h1 className="text-lg">Admin Panel</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeTab === item.id
                    ? "bg-red-50 text-red-500 border-r-4 border-red-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h2 className="text-xl">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                A
              </div>
              {sidebarOpen && (
                <div>
                  <p className="text-sm">Admin User</p>
                  <p className="text-xs text-gray-500">admin@aliexpress.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
