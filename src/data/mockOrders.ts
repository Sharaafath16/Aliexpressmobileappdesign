export const orders = [
  {
    id: "ORD-2025-001234",
    date: "2025-10-25",
    status: "delivered",
    items: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        title: "Wireless Bluetooth Headphones",
        variant: "Black - Premium",
        quantity: 1,
        price: 45.99,
      },
    ],
    total: 51.98,
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-2025-001233",
    date: "2025-10-20",
    status: "shipped",
    items: [
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1583573864191-af3ab094887a?w=400",
        title: "Premium Smartphone Accessories",
        variant: "Blue",
        quantity: 2,
        price: 24.99,
      },
    ],
    total: 54.98,
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-2025-001232",
    date: "2025-10-15",
    status: "processing",
    items: [
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1717295248494-937c3a5655b1?w=400",
        title: "Smart Watch Fitness Tracker",
        variant: "Silver - L",
        quantity: 1,
        price: 59.99,
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?w=400",
        title: "Professional Beauty Kit",
        variant: "Standard",
        quantity: 1,
        price: 39.99,
      },
    ],
    total: 105.98,
    trackingNumber: null,
  },
  {
    id: "ORD-2025-001231",
    date: "2025-10-10",
    status: "cancelled",
    items: [
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400",
        title: "Fashion Clothing Set",
        variant: "Red - M",
        quantity: 1,
        price: 34.99,
      },
    ],
    total: 40.98,
    trackingNumber: null,
  },
];

export const orderStatuses = {
  processing: { label: "Processing", color: "bg-blue-500" },
  shipped: { label: "Shipped", color: "bg-purple-500" },
  delivered: { label: "Delivered", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-gray-500" },
};
