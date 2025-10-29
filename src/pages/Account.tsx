import {
  ArrowLeft,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  Star,
  Gift,
  Shield,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

interface AccountProps {
  onBack: () => void;
}

export function Account({ onBack }: AccountProps) {
  const menuItems = [
    {
      category: "Orders & Shopping",
      items: [
        { icon: <ShoppingBag className="w-5 h-5" />, label: "My Orders", badge: "3" },
        { icon: <Heart className="w-5 h-5" />, label: "Wishlist", badge: "12" },
        { icon: <Star className="w-5 h-5" />, label: "My Reviews", badge: null },
        { icon: <Gift className="w-5 h-5" />, label: "Coupons", badge: "5" },
      ],
    },
    {
      category: "Account Settings",
      items: [
        { icon: <User className="w-5 h-5" />, label: "Profile Information", badge: null },
        { icon: <MapPin className="w-5 h-5" />, label: "Shipping Addresses", badge: "2" },
        { icon: <CreditCard className="w-5 h-5" />, label: "Payment Methods", badge: "1" },
        { icon: <Bell className="w-5 h-5" />, label: "Notifications", badge: null },
      ],
    },
    {
      category: "Support & Info",
      items: [
        { icon: <HelpCircle className="w-5 h-5" />, label: "Help Center", badge: null },
        { icon: <Shield className="w-5 h-5" />, label: "Buyer Protection", badge: null },
        { icon: <Settings className="w-5 h-5" />, label: "Settings", badge: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Account</h1>
        </div>

        {/* Profile Section */}
        <div className="px-4 pb-6 pt-2">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-red-500 text-xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg">John Doe</h2>
              <p className="text-sm opacity-90">john.doe@email.com</p>
            </div>
            <button className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Edit
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
              <p className="text-2xl">3</p>
              <p className="text-xs opacity-90 mt-1">Orders</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
              <p className="text-2xl">12</p>
              <p className="text-xs opacity-90 mt-1">Wishlist</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
              <p className="text-2xl">5</p>
              <p className="text-xs opacity-90 mt-1">Coupons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Card */}
      <div className="px-4 -mt-2">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Membership Level</p>
              <h3 className="text-lg text-white">Gold Member</h3>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <p className="text-sm text-white">2,450 pts</p>
            </div>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 w-3/5"></div>
          </div>
          <p className="text-xs text-gray-800 mt-2">550 points to Platinum</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-4 space-y-2">
        {menuItems.map((section, index) => (
          <div key={index} className="bg-white">
            <div className="px-4 py-2 border-b">
              <p className="text-xs text-gray-500">{section.category}</p>
            </div>
            <div className="divide-y">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-gray-600">{item.icon}</div>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      {/* App Info */}
      <div className="px-4 mt-6 text-center text-xs text-gray-500">
        <p>AliExpress App v1.0.0</p>
        <p className="mt-1">© 2025 AliExpress. All rights reserved.</p>
      </div>
    </div>
  );
}
