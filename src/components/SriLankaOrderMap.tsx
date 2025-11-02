import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface OrderLocation {
  id: string;
  city: string;
  orders: number;
  x: number; // Position on map (percentage)
  y: number; // Position on map (percentage)
}

const orderLocations: OrderLocation[] = [
  { id: "1", city: "Colombo", orders: 1247, x: 48, y: 72 },
  { id: "2", city: "Kandy", orders: 856, x: 52, y: 55 },
  { id: "3", city: "Galle", orders: 623, x: 48, y: 82 },
  { id: "4", city: "Jaffna", orders: 412, x: 50, y: 12 },
  { id: "5", city: "Negombo", orders: 534, x: 46, y: 68 },
  { id: "6", city: "Anuradhapura", orders: 289, x: 50, y: 38 },
  { id: "7", city: "Trincomalee", orders: 345, x: 60, y: 38 },
  { id: "8", city: "Batticaloa", orders: 267, x: 62, y: 58 },
  { id: "9", city: "Matara", orders: 398, x: 48, y: 88 },
  { id: "10", city: "Kurunegala", orders: 445, x: 48, y: 50 },
];

export function SriLankaOrderMap() {
  const totalOrders = orderLocations.reduce((sum, loc) => sum + loc.orders, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Location (Sri Lanka)</CardTitle>
        <p className="text-sm text-gray-600">Live order distribution across the country</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map */}
          <div className="flex-1 relative bg-gradient-to-br from-blue-100 via-blue-50 to-emerald-50 rounded-lg p-8 min-h-[500px] overflow-hidden">
            {/* Water effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-cyan-200/20"></div>
            
            {/* Sri Lanka Map SVG */}
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full relative z-10"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Drop shadow filter */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {/* Realistic Sri Lanka shape */}
              <path
                d="M 50 8 
                   C 52 9, 54 11, 55 14
                   L 57 20
                   C 58 25, 59 30, 60 35
                   L 62 42
                   C 63 48, 63 54, 62.5 60
                   C 62 66, 61 72, 59 77
                   L 57 83
                   C 55 87, 53 91, 51 95
                   L 50 99
                   C 49 97, 48 94, 47 91
                   L 45 85
                   C 43 80, 41 75, 40 69
                   L 38 62
                   C 37.5 56, 37.5 50, 38 44
                   C 38.5 38, 40 32, 42 27
                   L 45 20
                   C 46 16, 48 11, 50 8
                   Z"
                fill="url(#landGradient)"
                stroke="#047857"
                strokeWidth="0.8"
                filter="url(#shadow)"
              />
              
              {/* Order location markers */}
              {orderLocations.map((location) => {
                const size = Math.max(2, Math.min(8, location.orders / 100));
                return (
                  <g key={location.id}>
                    {/* Pulsing circle animation */}
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r={size}
                      fill="#ef4444"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        from={size}
                        to={size * 2}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.3"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Main marker */}
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r={size}
                      fill="#ef4444"
                      stroke="#fff"
                      strokeWidth="0.5"
                      className="cursor-pointer hover:fill-orange-500 transition-colors"
                    >
                      <title>{`${location.city}: ${location.orders} orders`}</title>
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* City List */}
          <div className="lg:w-64 space-y-2">
            <div className="mb-4">
              <h3 className="text-lg mb-1">Total Orders</h3>
              <p className="text-3xl text-green-600">{totalOrders.toLocaleString()}</p>
            </div>
            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
              {orderLocations
                .sort((a, b) => b.orders - a.orders)
                .map((location, index) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm">{location.city}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{location.orders} orders</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                          style={{
                            width: `${(location.orders / Math.max(...orderLocations.map(l => l.orders))) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {((location.orders / totalOrders) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
