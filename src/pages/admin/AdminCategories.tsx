import { useState } from "react";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
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
import { categoryData } from "../../data/categoryData";

interface Category {
  id: string;
  label: string;
  iconName: string;
  productsCount: number;
  isActive: boolean;
}

const mockCategories: Category[] = [
  { id: "electronics", label: "Electronics", iconName: "Smartphone", productsCount: 245, isActive: true },
  { id: "fashion", label: "Fashion", iconName: "Shirt", productsCount: 389, isActive: true },
  { id: "beauty", label: "Beauty", iconName: "Sparkles", productsCount: 156, isActive: true },
  { id: "sports", label: "Sports", iconName: "Zap", productsCount: 98, isActive: true },
  { id: "toys", label: "Toys", iconName: "Gift", productsCount: 127, isActive: true },
  { id: "home", label: "Home", iconName: "Heart", productsCount: 201, isActive: true },
];

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    iconName: "",
  });

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      label: "",
      iconName: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      label: category.label,
      iconName: category.iconName,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      setCategories([
        ...categories,
        {
          id: formData.label.toLowerCase(),
          ...formData,
          productsCount: 0,
          isActive: true,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const toggleActive = (id: string) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl mb-1">Categories</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {category.label}
                  </div>
                </TableCell>
                <TableCell>{category.iconName}</TableCell>
                <TableCell>{category.productsCount} products</TableCell>
                <TableCell>
                  <Badge
                    variant={category.isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleActive(category.id)}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="Electronics"
              />
            </div>
            <div>
              <Label>Icon Name (Lucide React)</Label>
              <Input
                value={formData.iconName}
                onChange={(e) =>
                  setFormData({ ...formData, iconName: e.target.value })
                }
                placeholder="Smartphone"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use icon names from lucide-react library
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
