import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar } from "lucide-react";

interface VideoData {
  title: string;
  thumbnail: string;
  platform: "YouTube" | "Instagram";
  duration?: string;
  views?: string;
  publishedAt?: string;
  formats: VideoFormat[];
}

interface VideoFormat {
  quality: string;
  format: string;
  size?: string;
  downloadUrl: string;
}

interface VideoPreviewProps {
  video: VideoData;
  onFormatSelect: (format: VideoFormat) => void;
}

export const VideoPreview = ({ video, onFormatSelect }: VideoPreviewProps) => {
  const platformColor = video.platform === "YouTube" ? "text-red-400" : "text-pink-400";
  
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-gradient-card border-border/50 shadow-card animate-scale-in">
          <CardContent className="p-8">
            {/* Platform Badge */}
            <div className="flex justify-between items-center mb-6">
              <Badge 
                variant="outline" 
                className={`${platformColor} border-current px-3 py-1 text-sm font-semibold bg-background/20`}
              >
                {video.platform}
              </Badge>
            </div>

            {/* Video Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Thumbnail */}
              <div className="md:col-span-1">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-foreground line-clamp-3 leading-tight">
                  {video.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {video.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{video.duration}</span>
                    </div>
                  )}
                  
                  {video.views && (
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{video.views} views</span>
                    </div>
                  )}
                  
                  {video.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{video.publishedAt}</span>
                    </div>
                  )}
                </div>

                {/* Format Selection */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold text-foreground">Choose Quality & Format</h3>
                  
                  <div className="grid gap-3">
                    {video.formats.map((format, index) => (
                      <button
                        key={index}
                        onClick={() => onFormatSelect(format)}
                        className="flex items-center justify-between p-4 bg-background/50 hover:bg-background/70 border border-border/30 hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-md group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-primary-foreground">
                              {format.format.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="text-left">
                            <div className="font-semibold text-foreground">
                              {format.quality}
                            </div>
                            {format.size && (
                              <div className="text-sm text-muted-foreground">
                                {format.size}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="px-4 py-2 bg-gradient-accent text-accent-foreground rounded-lg font-medium text-sm group-hover:shadow-accent transition-all duration-300">
                          Download
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};