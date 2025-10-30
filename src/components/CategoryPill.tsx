interface CategoryPillProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ icon, label, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 min-w-[60px] flex-shrink-0 ${
        active ? "text-red-500" : "text-gray-700"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          active ? "bg-red-50" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs text-center line-clamp-1">{label}</span>
    </button>
  );
}
