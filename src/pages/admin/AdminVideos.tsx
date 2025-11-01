import { useState } from "react";
import { Plus, Edit2, Trash2, Video } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
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

interface VideoShowcase {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  position: string;
  isActive: boolean;
}

const mockVideos: VideoShowcase[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1464854860390-e95991b46441",
    title: "Live Fashion Show",
    description: "Exclusive collection reveal",
    position: "Home - After Banners",
    isActive: true,
  },
];

export function AdminVideos() {
  const [videos, setVideos] = useState<VideoShowcase[]>(mockVideos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoShowcase | null>(null);
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    position: "",
  });

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({
      thumbnail: "",
      title: "",
      description: "",
      position: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (video: VideoShowcase) => {
    setEditingVideo(video);
    setFormData({
      thumbnail: video.thumbnail,
      title: video.title,
      description: video.description,
      position: video.position,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingVideo) {
      setVideos(
        videos.map((v) =>
          v.id === editingVideo.id
            ? { ...v, ...formData }
            : v
        )
      );
    } else {
      setVideos([
        ...videos,
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
    setVideos(videos.filter((v) => v.id !== id));
  };

  const toggleActive = (id: number) => {
    setVideos(
      videos.map((v) =>
        v.id === id ? { ...v, isActive: !v.isActive } : v
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl mb-1">Video Showcases</h1>
          <p className="text-gray-600">Manage video content and live streams</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Video
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell className="max-w-xs truncate">{video.description}</TableCell>
                <TableCell>{video.position}</TableCell>
                <TableCell>
                  <Badge
                    variant={video.isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => toggleActive(video.id)}
                  >
                    {video.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(video)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(video.id)}
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
              {editingVideo ? "Edit Video Showcase" : "Add New Video Showcase"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Thumbnail URL</Label>
              <Input
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Live Fashion Show"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Exclusive collection reveal"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                placeholder="Home - After Banners"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
