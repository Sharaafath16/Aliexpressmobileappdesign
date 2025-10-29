import { useState } from "react";
import { Search, Eye, Download, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { orders, orderStatuses } from "../../data/mockOrders";

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Orders Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-600">Total Orders</p>
          <h3 className="text-2xl mt-2">{orders.length}</h3>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-600">Processing</p>
          <h3 className="text-2xl mt-2">
            {orders.filter((o) => o.status === "processing").length}
          </h3>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-600">Shipped</p>
          <h3 className="text-2xl mt-2">
            {orders.filter((o) => o.status === "shipped").length}
          </h3>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-600">Delivered</p>
          <h3 className="text-2xl mt-2">
            {orders.filter((o) => o.status === "delivered").length}
          </h3>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedStatus("all")}>
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            onClick={() => setSelectedStatus("processing")}
          >
            Processing
          </TabsTrigger>
          <TabsTrigger value="shipped" onClick={() => setSelectedStatus("shipped")}>
            Shipped
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            onClick={() => setSelectedStatus("delivered")}
          >
            Delivered
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            onClick={() => setSelectedStatus("cancelled")}
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tracking</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const statusConfig =
                    orderStatuses[order.status as keyof typeof orderStatuses];
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="text-sm">{order.id}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{order.date}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{order.items.length} items</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">${order.total.toFixed(2)}</p>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          {order.trackingNumber || "N/A"}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-4 of {orders.length} orders</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-red-500 text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
