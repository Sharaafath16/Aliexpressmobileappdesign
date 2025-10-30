import { Play, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VideoShowcaseProps {
  thumbnail: string;
  title: string;
  description?: string;
}

export function VideoShowcase({ thumbnail, title, description }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative rounded-lg overflow-hidden group shadow-sm">
      <ImageWithFallback
        src={thumbnail}
        alt={title}
        className="w-full h-44 object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
            >
              <Play className="w-8 h-8 text-red-500 ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Title and controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white mb-1">{title}</h3>
          {description && (
            <p className="text-white/80 text-sm mb-2">{description}</p>
          )}
          
          {isPlaying && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-1/3 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Live badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
        </div>
      </div>
    </div>
  );
}
