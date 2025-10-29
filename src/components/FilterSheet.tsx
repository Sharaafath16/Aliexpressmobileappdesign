import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  freeShipping: boolean;
}

export function FilterSheet({
  open,
  onOpenChange,
  onApply,
  filters,
}: FilterSheetProps) {
  const handleApply = () => {
    onApply(filters);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6 overflow-y-auto h-[calc(80vh-120px)]">
          {/* Price Range */}
          <div>
            <Label>Price Range</Label>
            <div className="mt-3">
              <Slider
                defaultValue={filters.priceRange}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label>Categories</Label>
            <div className="mt-3 space-y-3">
              {["Electronics", "Fashion", "Beauty", "Sports", "Home", "Toys"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <label htmlFor={category} className="text-sm">
                      {category}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label>Minimum Rating</Label>
            <div className="mt-3 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="text-sm">
                    {rating} stars & up
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center space-x-2">
            <Checkbox id="free-shipping" />
            <label htmlFor="free-shipping" className="text-sm">
              Free Shipping Only
            </label>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
