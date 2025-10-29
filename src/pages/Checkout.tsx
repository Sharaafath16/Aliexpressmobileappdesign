import { useState } from "react";
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useCart } from "../context/CartContext";
import { toast } from "sonner@2.0.3";

interface CheckoutProps {
  onBack: () => void;
  onComplete: () => void;
}

export function Checkout({ onBack, onComplete }: CheckoutProps) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"address" | "payment" | "review">("address");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const shippingCost = 5.99;
  const total = getCartTotal() + shippingCost;

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    clearCart();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-3 border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1>Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="bg-white px-4 py-4 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "address"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {step === "address" ? <MapPin className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <span className="text-xs">Address</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "payment"
                  ? "bg-red-500 text-white"
                  : step === "review"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {step === "review" ? <CheckCircle className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
            </div>
            <span className="text-xs">Payment</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "review" ? "bg-red-500 text-white" : "bg-gray-300"
              }`}
            >
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-xs">Review</span>
          </div>
        </div>
      </div>

      {/* Address Form */}
      {step === "address" && (
        <div className="bg-white px-4 py-4 mt-2">
          <h2 className="mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="123 Main St"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress({ ...address, zipCode: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="USA"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form */}
      {step === "payment" && (
        <div className="bg-white px-4 py-4 mt-2">
          <h2 className="mb-4">Payment Method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1">Cash on Delivery</Label>
              </div>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    setPayment({ ...payment, cardNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={payment.cardName}
                  onChange={(e) =>
                    setPayment({ ...payment, cardName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={payment.expiryDate}
                    onChange={(e) =>
                      setPayment({ ...payment, expiryDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={payment.cvv}
                    onChange={(e) =>
                      setPayment({ ...payment, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order Review */}
      {step === "review" && (
        <div className="space-y-2 mt-2">
          <div className="bg-white px-4 py-4">
            <h2 className="mb-3">Shipping Address</h2>
            <p className="text-sm">{address.fullName}</p>
            <p className="text-sm text-gray-600">{address.phone}</p>
            <p className="text-sm text-gray-600 mt-2">
              {address.street}, {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-sm text-gray-600">{address.country}</p>
          </div>

          <div className="bg-white px-4 py-4">
            <h2 className="mb-3">Order Items ({cart.length})</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="flex-1">{item.title} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white px-4 py-4">
            <h2 className="mb-3">Payment Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span>Total</span>
                <span className="text-red-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Total:</span>
          <span className="text-red-500">${total.toFixed(2)}</span>
        </div>
        {step === "address" && (
          <Button
            onClick={() => setStep("payment")}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            Continue to Payment
          </Button>
        )}
        {step === "payment" && (
          <Button
            onClick={() => setStep("review")}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            Review Order
          </Button>
        )}
        {step === "review" && (
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
}
