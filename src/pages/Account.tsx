import { useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  MessageCircle,
  Gift,
  Truck,
  Clock,
  Package,
  CheckCircle,
  Star,
  Settings,
  LogOut,
  Bell,
  Wallet,
  CreditCard,
  MapPin,
  Globe,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  FileText,
  Award,
  Coins,
  Percent,
  Tag,
  Eye,
  TrendingUp,
  Zap,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AdminLogin } from "./AdminLogin";

interface AccountProps {
  onBack: () => void;
  onAdminAccess?: (admin: any) => void;
}

export function Account({ onBack, onAdminAccess }: AccountProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  if (showAdminLogin) {
    return (
      <AdminLogin
        onLoginSuccess={(admin) => {
          setShowAdminLogin(false);
          if (onAdminAccess) {
            onAdminAccess(admin);
          }
        }}
        onCancel={() => setShowAdminLogin(false)}
      />
    );
  }

  // Quick login check - if not logged in, show simplified login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl mb-2">Welcome to AliExpress</h2>
            <p className="text-sm text-gray-500">Sign in to access your account</p>
          </div>
          <Button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 mb-3"
          >
            Sign In / Sign Up
          </Button>
          <Button
            onClick={() => setShowAdminLogin(true)}
            variant="outline"
            className="w-full"
          >
            Admin Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white pb-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl">Account</h1>
            <div className="flex gap-2">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-red-500 text-xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg">John Doe</h2>
                <Badge className="bg-yellow-400 text-black border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              </div>
              <p className="text-sm opacity-90">john.doe@email.com</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">2,450 Points</span>
                <span className="text-xs opacity-75">• Level 5</span>
              </div>
            </div>
            <button className="bg-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/30 backdrop-blur-sm">
              Edit
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-5 gap-3 text-center">
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-xs">Wallet</span>
              <span className="text-xs opacity-90">$245.50</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-xs">Coins</span>
              <span className="text-xs opacity-90">1,250</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 relative">
                <Gift className="w-6 h-6" />
                <Badge className="absolute -top-1 -right-1 bg-red-600 border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  5
                </Badge>
              </div>
              <span className="text-xs">Coupons</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 relative">
                <Heart className="w-6 h-6" />
                <Badge className="absolute -top-1 -right-1 bg-red-600 border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  12
                </Badge>
              </div>
              <span className="text-xs">Wishlist</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 relative">
                <MessageCircle className="w-6 h-6" />
                <Badge className="absolute -top-1 -right-1 bg-red-600 border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </div>
              <span className="text-xs">Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIP Membership Card */}
      <div className="px-4 -mt-4 mb-4">
        <Card className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="p-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <h3>VIP Member</h3>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Level 5</span>
            </div>
            <p className="text-sm opacity-90 mb-3">2,450 / 3,000 points to Level 6</p>
            <Progress value={81.6} className="h-2 bg-white/20 mb-2" />
            <p className="text-xs opacity-75">550 points to unlock exclusive benefits</p>
          </div>
        </Card>
      </div>

      {/* Promotional Banner */}
      <div className="px-4 mb-4">
        <div className="relative h-32 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1740377016263-88f2bec96f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGJhbm5lciUyMHByb21vdGlvbnxlbnwxfHx8fDE3NjE4MTU2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Promotion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-4">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Flash Sale</span>
              </div>
              <h3 className="text-xl mb-1">Up to 70% OFF</h3>
              <Button size="sm" className="bg-red-500 hover:bg-red-600 border-0">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* My Orders Section */}
      <Card className="mx-4 mb-4">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            My Orders
          </h3>
          <button className="text-sm text-red-500 flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-5 divide-x">
          <button className="p-4 text-center hover:bg-gray-50">
            <div className="flex justify-center mb-2 relative">
              <Wallet className="w-6 h-6 text-orange-500" />
              <Badge className="absolute -top-1 -right-2 bg-red-500 border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                1
              </Badge>
            </div>
            <span className="text-xs text-gray-600">Unpaid</span>
          </button>
          <button className="p-4 text-center hover:bg-gray-50">
            <div className="flex justify-center mb-2 relative">
              <Package className="w-6 h-6 text-blue-500" />
              <Badge className="absolute -top-1 -right-2 bg-red-500 border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                2
              </Badge>
            </div>
            <span className="text-xs text-gray-600">Processing</span>
          </button>
          <button className="p-4 text-center hover:bg-gray-50">
            <div className="flex justify-center mb-2">
              <Truck className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs text-gray-600">Shipped</span>
          </button>
          <button className="p-4 text-center hover:bg-gray-50">
            <div className="flex justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-xs text-gray-600">Review</span>
          </button>
          <button className="p-4 text-center hover:bg-gray-50">
            <div className="flex justify-center mb-2">
              <Clock className="w-6 h-6 text-gray-500" />
            </div>
            <span className="text-xs text-gray-600">Returns</span>
          </button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="mx-4 mb-4">
        <div className="p-4 border-b">
          <h3 className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </h3>
        </div>
        <div className="divide-y">
          <div className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm">Recently Viewed</p>
              <p className="text-xs text-gray-500">23 products</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm">Purchase History</p>
              <p className="text-xs text-gray-500">45 orders</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Card>

      {/* Tools & Services */}
      <Card className="mx-4 mb-4">
        <div className="p-4 border-b">
          <h3>Tools & Services</h3>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-xs text-center">Deals</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs text-center">Rewards</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs text-center">Vouchers</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs text-center">Protection</span>
          </button>
        </div>
      </Card>

      {/* Settings & Preferences */}
      <Card className="mx-4 mb-4">
        <div className="p-4 border-b">
          <h3>Settings & Preferences</h3>
        </div>
        <div className="divide-y">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <MapPin className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-sm">Shipping Addresses</p>
              <p className="text-xs text-gray-500">2 addresses</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-sm">Payment Methods</p>
              <p className="text-xs text-gray-500">3 cards saved</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <Globe className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-sm">Language & Currency</p>
              <p className="text-xs text-gray-500">English, USD</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-sm">Notifications</p>
              <p className="text-xs text-gray-500">Push, Email, SMS</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="mx-4 mb-4">
        <div className="p-4 border-b">
          <h3>Help & Support</h3>
        </div>
        <div className="divide-y">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-sm">Help Center</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-sm">Live Chat</span>
            <Badge className="bg-green-500 border-0">Online</Badge>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="flex-1 text-left text-sm">Terms & Policies</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </Card>

      {/* Logout */}
      <div className="px-4 mb-4">
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => setIsLoggedIn(false)}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* App Info */}
      <div className="text-center text-xs text-gray-500 px-4">
        <p>AliExpress v2.0.0</p>
        <p className="mt-1">© 2025 AliExpress. All rights reserved.</p>
      </div>
    </div>
  );
}
