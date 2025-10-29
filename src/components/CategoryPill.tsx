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
      className={`flex flex-col items-center gap-2 min-w-[70px] ${
        active ? "text-red-500" : "text-gray-700"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center ${
          active ? "bg-red-50" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs text-center">{label}</span>
    </button>
  );
}
