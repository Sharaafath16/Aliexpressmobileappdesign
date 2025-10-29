export const adminStats = {
  totalRevenue: 125430.50,
  totalOrders: 1234,
  totalProducts: 856,
  totalUsers: 5432,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  productsGrowth: 15.2,
  usersGrowth: 22.1,
};

export const recentOrders = [
  {
    id: "ORD-001234",
    customer: "John Doe",
    date: "2025-10-29",
    amount: 125.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-001233",
    customer: "Jane Smith",
    date: "2025-10-29",
    amount: 89.50,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD-001232",
    customer: "Bob Johnson",
    date: "2025-10-28",
    amount: 234.00,
    status: "processing",
    items: 5,
  },
  {
    id: "ORD-001231",
    customer: "Alice Brown",
    date: "2025-10-28",
    amount: 67.25,
    status: "delivered",
    items: 1,
  },
];

export const topProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    sales: 456,
    revenue: 20952.00,
    stock: 123,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 2,
    name: "Smart Watch",
    sales: 334,
    revenue: 19966.66,
    stock: 67,
    image: "https://images.unsplash.com/photo-1717295248494-937c3a5655b1?w=400",
  },
  {
    id: 3,
    name: "Phone Accessories",
    sales: 789,
    revenue: 19701.11,
    stock: 234,
    image: "https://images.unsplash.com/photo-1583573864191-af3ab094887a?w=400",
  },
];

export const adminUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    joinDate: "2025-01-15",
    orders: 12,
    spent: 1250.50,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Customer",
    joinDate: "2025-02-20",
    orders: 8,
    spent: 890.25,
    status: "active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    joinDate: "2024-12-01",
    orders: 0,
    spent: 0,
    status: "active",
  },
];

export const salesData = [
  { month: "Jan", revenue: 12400, orders: 124 },
  { month: "Feb", revenue: 15200, orders: 152 },
  { month: "Mar", revenue: 18900, orders: 189 },
  { month: "Apr", revenue: 16700, orders: 167 },
  { month: "May", revenue: 21500, orders: 215 },
  { month: "Jun", revenue: 24300, orders: 243 },
];
