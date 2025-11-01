import { useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
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

interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  position: string;
  isActive: boolean;
}

const mockBanners: Banner[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1580978608550-0390af9b72b6",
    title: "Mega Sale",
    subtitle: "Up to 70% OFF",
    buttonText: "Shop Now",
    position: "Home - Top",
    isActive: true,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1582018960590-f3bc3ea25c04",
    title: "Tech Gadgets",
    subtitle: "Latest arrivals",
    buttonText: "Explore",
    position: "Home - Middle",
    isActive: true,
  },
];

export function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    buttonText: "",
    position: "",
  });

  const handleAdd = () => {
    setEditingBanner(null);
    setFormData({
      imageUrl: "",
      title: "",
      subtitle: "",
      buttonText: "",
      position: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      imageUrl: banner.imageUrl,
      title: banner.title,
      subtitle: banner.subtitle,
      buttonText: banner.buttonText,
      position: banner.position,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? { ...b, ...formData }
            : b
        )
      );
    } else {
      setBanners([
        ...banners,
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
    setBanners(banners.filter((b) => b.id !== id));
  };

  const toggleActive = (id: number) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl mb-1">Promotional Banners</h1>
          <p className="text-gray-600">Manage promotional banners across the app</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Banner
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="w-20 h-12 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{banner.title}</TableCell>
                <TableCell>{banner.subtitle}</TableCell>
                <TableCell>{banner.position}</TableCell>
                <TableCell>
                  <Badge
                    variant={banner.isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleActive(banner.id)}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
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
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Mega Sale"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="Up to 70% OFF"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={formData.buttonText}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonText: e.target.value })
                  }
                  placeholder="Shop Now"
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="Home - Top"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Banner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
