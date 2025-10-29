import { ArrowLeft, Package, Truck, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { orders, orderStatuses } from "../data/mockOrders";

interface OrdersProps {
  onBack: () => void;
}

export function Orders({ onBack }: OrdersProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter((order) => order.status === status);
  };

  const OrderCard = ({ order }: { order: typeof orders[0] }) => {
    const statusConfig = orderStatuses[order.status as keyof typeof orderStatuses];

    return (
      <div className="bg-white rounded-lg overflow-hidden mb-3">
        {/* Order Header */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-b">
          <div>
            <p className="text-sm">{order.id}</p>
            <p className="text-xs text-gray-500">{order.date}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs ${statusConfig.color}`}>
            {getStatusIcon(order.status)}
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm line-clamp-2 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{item.variant}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm">US ${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Order Total */}
          <div className="pt-3 border-t flex items-center justify-between">
            <span className="text-sm text-gray-600">Order Total</span>
            <span className="text-red-500">US ${order.total.toFixed(2)}</span>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Tracking Number</p>
              <p className="text-sm">{order.trackingNumber}</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            {order.status === "delivered" && (
              <>
                <Button variant="outline" className="flex-1" size="sm">
                  Buy Again
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Review
                </Button>
              </>
            )}
            {order.status === "shipped" && (
              <Button className="flex-1 bg-red-500 hover:bg-red-600" size="sm">
                Track Package
              </Button>
            )}
            {order.status === "processing" && (
              <Button variant="outline" className="flex-1" size="sm">
                Cancel Order
              </Button>
            )}
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-3 border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1>My Orders</h1>
      </div>

      {/* Stats */}
      <div className="bg-white mt-2 px-4 py-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-xs text-gray-600">Processing</p>
          <p className="text-sm">
            {filterOrders("processing").length}
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <Truck className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-xs text-gray-600">Shipped</p>
          <p className="text-sm">
            {filterOrders("shipped").length}
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-xs text-gray-600">Delivered</p>
          <p className="text-sm">
            {filterOrders("delivered").length}
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <XCircle className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-xs text-gray-600">Cancelled</p>
          <p className="text-sm">
            {filterOrders("cancelled").length}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-2">
        <Tabs defaultValue="all" className="w-full">
          <div className="bg-white sticky top-[57px] z-40">
            <TabsList className="w-full grid grid-cols-5 h-12">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="processing" className="text-xs">Processing</TabsTrigger>
              <TabsTrigger value="shipped" className="text-xs">Shipped</TabsTrigger>
              <TabsTrigger value="delivered" className="text-xs">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="all" className="mt-0">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            <TabsContent value="processing" className="mt-0">
              {filterOrders("processing").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            <TabsContent value="shipped" className="mt-0">
              {filterOrders("shipped").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            <TabsContent value="delivered" className="mt-0">
              {filterOrders("delivered").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-0">
              {filterOrders("cancelled").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
