import { useState } from "react";
import { Plus, Edit, Trash2, Zap, Clock, DollarSign, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner@2.0.3";

interface FlashDeal {
  id: string;
  productName: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  stock: number;
  sold: number;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired";
  image: string;
}

export function AdminFlashDeals() {
  const [deals, setDeals] = useState<FlashDeal[]>([
    {
      id: "1",
      productName: "Wireless Earbuds Pro",
      originalPrice: 99.99,
      dealPrice: 49.99,
      discount: 50,
      stock: 100,
      sold: 45,
      startDate: "2025-11-01",
      endDate: "2025-11-03",
      status: "active",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200",
    },
    {
      id: "2",
      productName: "Smart Watch X",
      originalPrice: 299.99,
      dealPrice: 199.99,
      discount: 33,
      stock: 50,
      sold: 28,
      startDate: "2025-11-01",
      endDate: "2025-11-02",
      status: "active",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200",
    },
    {
      id: "3",
      productName: "Gaming Mouse RGB",
      originalPrice: 79.99,
      dealPrice: 39.99,
      discount: 50,
      stock: 200,
      sold: 156,
      startDate: "2025-11-05",
      endDate: "2025-11-07",
      status: "scheduled",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<FlashDeal | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    originalPrice: "",
    dealPrice: "",
    stock: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const handleAddDeal = () => {
    setEditingDeal(null);
    setFormData({
      productName: "",
      originalPrice: "",
      dealPrice: "",
      stock: "",
      startDate: "",
      endDate: "",
      image: "",
    });
    setDialogOpen(true);
  };

  const handleEditDeal = (deal: FlashDeal) => {
    setEditingDeal(deal);
    setFormData({
      productName: deal.productName,
      originalPrice: deal.originalPrice.toString(),
      dealPrice: deal.dealPrice.toString(),
      stock: deal.stock.toString(),
      startDate: deal.startDate,
      endDate: deal.endDate,
      image: deal.image,
    });
    setDialogOpen(true);
  };

  const handleSaveDeal = () => {
    const originalPrice = parseFloat(formData.originalPrice);
    const dealPrice = parseFloat(formData.dealPrice);
    const discount = Math.round(((originalPrice - dealPrice) / originalPrice) * 100);

    if (editingDeal) {
      setDeals(
        deals.map((d) =>
          d.id === editingDeal.id
            ? {
                ...d,
                productName: formData.productName,
                originalPrice,
                dealPrice,
                discount,
                stock: parseInt(formData.stock),
                startDate: formData.startDate,
                endDate: formData.endDate,
                image: formData.image,
              }
            : d
        )
      );
      toast.success("Flash deal updated successfully!");
    } else {
      const newDeal: FlashDeal = {
        id: (deals.length + 1).toString(),
        productName: formData.productName,
        originalPrice,
        dealPrice,
        discount,
        stock: parseInt(formData.stock),
        sold: 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: new Date(formData.startDate) > new Date() ? "scheduled" : "active",
        image: formData.image,
      };
      setDeals([...deals, newDeal]);
      toast.success("Flash deal created successfully!");
    }
    setDialogOpen(false);
  };

  const handleDeleteDeal = (id: string) => {
    setDeals(deals.filter((d) => d.id !== id));
    toast.success("Flash deal deleted successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "expired":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const activeDeals = deals.filter((d) => d.status === "active");
  const scheduledDeals = deals.filter((d) => d.status === "scheduled");
  const totalRevenue = activeDeals.reduce((sum, d) => sum + d.dealPrice * d.sold, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Flash Deals Management</h1>
          <p className="text-gray-600">Manage time-limited special offers and promotions</p>
        </div>
        <Button onClick={handleAddDeal} className="bg-gradient-to-r from-red-500 to-orange-500">
          <Plus className="w-4 h-4 mr-2" />
          Add Flash Deal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Deals</p>
                <h3 className="text-2xl">{activeDeals.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600 fill-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled Deals</p>
                <h3 className="text-2xl">{scheduledDeals.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <h3 className="text-2xl">${totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Items Sold</p>
                <h3 className="text-2xl">{activeDeals.reduce((sum, d) => sum + d.sold, 0)}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Flash Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={deal.image}
                        alt={deal.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span>{deal.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="line-through text-gray-400 text-sm">
                        ${deal.originalPrice}
                      </div>
                      <div className="text-red-600">${deal.dealPrice}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-700">{deal.discount}% OFF</Badge>
                  </TableCell>
                  <TableCell>{deal.stock}</TableCell>
                  <TableCell>
                    <div>
                      <div>{deal.sold}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((deal.sold / deal.stock) * 100)}% sold
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{deal.startDate}</div>
                      <div className="text-gray-500">to {deal.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditDeal(deal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDeal(deal.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingDeal ? "Edit Flash Deal" : "Add New Flash Deal"}
            </DialogTitle>
            <DialogDescription>
              {editingDeal
                ? "Update the flash deal details below"
                : "Create a new flash deal by filling in the details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Original Price ($)</Label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="99.99"
              />
            </div>
            <div className="space-y-2">
              <Label>Deal Price ($)</Label>
              <Input
                type="number"
                value={formData.dealPrice}
                onChange={(e) => setFormData({ ...formData, dealPrice: e.target.value })}
                placeholder="49.99"
              />
            </div>
            <div className="space-y-2">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveDeal}
              className="bg-gradient-to-r from-red-500 to-orange-500"
            >
              {editingDeal ? "Update Deal" : "Create Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
