import { useState } from "react";
import { Plus, Edit2, Trash2, Bell } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface Notification {
  id: number;
  type: "deal" | "trending" | "flash" | "reward";
  message: string;
  action?: string;
  isActive: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "flash",
    message: "⚡ Flash Sale! 50% OFF Electronics - Limited Time",
    action: "Shop Now",
    isActive: true,
  },
  {
    id: 2,
    type: "deal",
    message: "🎁 New coupon available: $10 OFF your next order",
    action: "Claim",
    isActive: true,
  },
  {
    id: 3,
    type: "trending",
    message: "🔥 Trending Now: Wireless Earbuds - 1000+ sold today",
    action: "View",
    isActive: true,
  },
  {
    id: 4,
    type: "reward",
    message: "⭐ You've earned 100 points! Redeem for rewards",
    action: "Redeem",
    isActive: true,
  },
];

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    type: "flash" as const,
    message: "",
    action: "",
  });

  const handleAdd = () => {
    setEditingNotification(null);
    setFormData({
      type: "flash",
      message: "",
      action: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      type: notification.type,
      message: notification.message,
      action: notification.action || "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingNotification) {
      setNotifications(
        notifications.map((n) =>
          n.id === editingNotification.id
            ? { ...n, ...formData }
            : n
        )
      );
    } else {
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          ...formData,
          isActive: true,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleActive = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isActive: !n.isActive } : n
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flash":
        return "bg-yellow-100 text-yellow-800";
      case "deal":
        return "bg-green-100 text-green-800";
      case "trending":
        return "bg-orange-100 text-orange-800";
      case "reward":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl mb-1">Notification Banners</h1>
          <p className="text-gray-600">Manage top notification banners</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Notification
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Action Button</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <Badge className={getTypeColor(notification.type)}>
                    {notification.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {notification.message}
                </TableCell>
                <TableCell>{notification.action || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={notification.isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleActive(notification.id)}
                  >
                    {notification.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(notification)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNotification ? "Edit Notification" : "Add New Notification"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flash">Flash Sale</SelectItem>
                  <SelectItem value="deal">Deal</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="reward">Reward</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Message</Label>
              <Input
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="⚡ Flash Sale! 50% OFF Electronics - Limited Time"
              />
            </div>
            <div>
              <Label>Action Button Text (Optional)</Label>
              <Input
                value={formData.action}
                onChange={(e) =>
                  setFormData({ ...formData, action: e.target.value })
                }
                placeholder="Shop Now"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
