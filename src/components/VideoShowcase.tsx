import { Play, Volume2, VolumeX, X } from "lucide-react";
import { useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VideoShowcaseProps {
  thumbnail: string;
  title: string;
  description?: string;
  videoUrl?: string;
}

export function VideoShowcase({ thumbnail, title, description, videoUrl }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoUrl) {
      setShowFullScreen(true);
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
    }
  };

  const handleClose = () => {
    setShowFullScreen(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <div className="relative rounded-lg overflow-hidden group shadow-sm">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-44 object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
            >
              <Play className="w-8 h-8 text-red-500 ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white mb-1">{title}</h3>
            {description && (
              <p className="text-white/80 text-sm mb-2">{description}</p>
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

      {/* Full Screen Video */}
      {showFullScreen && videoUrl && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            muted={isMuted}
            playsInline
            autoPlay
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute bottom-4 left-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          </div>
        </div>
      )}
    </>
  );
}
