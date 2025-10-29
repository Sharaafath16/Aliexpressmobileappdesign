import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ReviewCardProps {
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export function ReviewCard({
  userName,
  avatar,
  rating,
  date,
  comment,
  helpful,
}: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarFallback>{avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm">{userName}</p>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 mt-2">{comment}</p>
          <button className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <ThumbsUp className="w-3 h-3" />
            Helpful ({helpful})
          </button>
        </div>
      </div>
    </div>
  );
}
