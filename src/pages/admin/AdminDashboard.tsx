import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { adminStats, recentOrders, topProducts, salesData } from "../../data/adminData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AdminDashboard() {
  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string;
    growth: number;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h3 className="text-2xl mt-2">{value}</h3>
            <div className="flex items-center gap-1 mt-2">
              {growth > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm ${growth > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {growth > 0 ? "+" : ""}
                {growth}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Admin!</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Last 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          growth={adminStats.revenueGrowth}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Total Orders"
          value={adminStats.totalOrders.toLocaleString()}
          growth={adminStats.ordersGrowth}
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Products"
          value={adminStats.totalProducts.toLocaleString()}
          growth={adminStats.productsGrowth}
          icon={Package}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          growth={adminStats.usersGrowth}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <button className="text-sm text-red-500 flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${order.amount.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <button className="text-sm text-red-500 flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${product.revenue.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
