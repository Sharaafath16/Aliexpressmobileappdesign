import { Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface SortSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

export function SortSheet({
  open,
  onOpenChange,
  selectedSort,
  onSelectSort,
}: SortSheetProps) {
  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rating" },
    { id: "popular", label: "Most Popular" },
    { id: "newest", label: "Newest Arrivals" },
  ];

  const handleSelect = (sortId: string) => {
    onSelectSort(sortId);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto">
        <SheetHeader>
          <SheetTitle>Sort By</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                selectedSort === option.id
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <span>{option.label}</span>
              {selectedSort === option.id && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
