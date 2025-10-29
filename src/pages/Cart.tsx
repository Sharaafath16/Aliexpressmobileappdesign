import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function Cart({ onBack, onCheckout }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>(
    cart.map((item) => item.id)
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cart.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const selectedTotal = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      return;
    }
    onCheckout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-3 border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1>Shopping Cart ({cart.length})</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] px-4">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Add items to get started
          </p>
          <Button onClick={onBack} className="bg-red-500 hover:bg-red-600">
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          {/* Select All */}
          <div className="bg-white px-4 py-3 flex items-center gap-3 border-b">
            <Checkbox
              id="select-all"
              checked={selectedItems.length === cart.length}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm">
              Select All ({cart.length} items)
            </label>
          </div>

          {/* Cart Items */}
          <div className="space-y-2 mt-2">
            {cart.map((item) => (
              <div key={item.id} className="bg-white px-4 py-4">
                <div className="flex gap-3">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(item.id, checked as boolean)
                    }
                  />
                  <div className="flex-1 flex gap-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm line-clamp-2 mb-1">{item.title}</h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mb-2">
                          {item.variant}
                        </p>
                      )}
                      <p className="text-red-500 mb-2">
                        US ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all-bottom"
                checked={selectedItems.length === cart.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all-bottom" className="text-sm">
                All
              </label>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total:</p>
              <p className="text-red-500">US ${selectedTotal.toFixed(2)}</p>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300"
          >
            Checkout ({selectedItems.length})
          </Button>
        </div>
      )}
    </div>
  );
}
