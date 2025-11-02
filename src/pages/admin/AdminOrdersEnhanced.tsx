import { useState } from "react";
import { 
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Card, CardContent } from "../../components/ui/card";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: "paid" | "unpaid" | "refunded";
  items: number;
}

const mockOrders: Order[] = [
  {
    id: "#ORD-12453",
    customer: "John Doe",
    email: "john@example.com",
    date: "2025-10-28",
    total: 125.50,
    status: "delivered",
    payment: "paid",
    items: 3,
  },
  {
    id: "#ORD-12452",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2025-10-28",
    total: 89.99,
    status: "processing",
    payment: "paid",
    items: 2,
  },
  {
    id: "#ORD-12451",
    customer: "Mike Johnson",
    email: "mike@example.com",
    date: "2025-10-27",
    total: 245.00,
    status: "shipped",
    payment: "paid",
    items: 5,
  },
  {
    id: "#ORD-12450",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    date: "2025-10-27",
    total: 67.50,
    status: "pending",
    payment: "unpaid",
    items: 1,
  },
  {
    id: "#ORD-12449",
    customer: "Tom Brown",
    email: "tom@example.com",
    date: "2025-10-26",
    total: 189.99,
    status: "delivered",
    payment: "paid",
    items: 4,
  },
  {
    id: "#ORD-12448",
    customer: "Lisa Davis",
    email: "lisa@example.com",
    date: "2025-10-26",
    total: 299.99,
    status: "cancelled",
    payment: "refunded",
    items: 2,
  },
];

const statusStats = [
  { label: "Pending", count: 12, icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
  { label: "Processing", count: 8, icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Shipped", count: 15, icon: Truck, color: "text-purple-600", bgColor: "bg-purple-50" },
  { label: "Delivered", count: 234, icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
];

export function AdminOrdersEnhanced() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.id?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (order.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "unpaid":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-1">Orders Management</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statusStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-2xl">{stat.count}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by order ID, customer, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center justify-between">
          <p className="text-sm text-blue-900">
            {selectedOrders.length} order{selectedOrders.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Package className="w-4 h-4 mr-2" />
              Mark as Processing
            </Button>
            <Button variant="outline" size="sm">
              <Truck className="w-4 h-4 mr-2" />
              Mark as Shipped
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Selected
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleOrderSelection(order.id)}
                  />
                </TableCell>
                <TableCell>
                  <p className="text-sm text-blue-600">{order.id}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm">{order.items} items</TableCell>
                <TableCell>
                  <p className="text-sm">${order.total.toFixed(2)}</p>
                </TableCell>
                <TableCell>
                  <Badge className={getPaymentColor(order.payment)}>
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="w-4 h-4 mr-2" />
                        Mark as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="w-4 h-4 mr-2" />
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
