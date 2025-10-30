import { X } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PromoBannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  dismissible?: boolean;
}

export function PromoBanner({
  imageUrl,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  dismissible = true,
}: PromoBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm">
      <ImageWithFallback
        src={imageUrl}
        alt={title}
        className="w-full h-36 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center px-4">
        <div className="text-white max-w-[70%]">
          <h3 className="text-xl mb-1">{title}</h3>
          {subtitle && <p className="text-sm opacity-90 mb-2">{subtitle}</p>}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
