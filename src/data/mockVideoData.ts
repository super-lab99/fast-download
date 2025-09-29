export interface VideoFormat {
  quality: string;
  format: string;
  size?: string;
  downloadUrl: string;
}

export interface VideoData {
  title: string;
  thumbnail: string;
  platform: "YouTube" | "Instagram";
  duration?: string;
  views?: string;
  publishedAt?: string;
  formats: VideoFormat[];
}

// Mock API function to simulate video processing
export const processVideoUrl = async (url: string): Promise<VideoData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isInstagram = url.includes("instagram.com");

  if (!isYouTube && !isInstagram) {
    throw new Error("Unsupported platform. Only YouTube and Instagram are supported.");
  }

  // Mock data based on platform
  if (isYouTube) {
    return {
      title: "Amazing Nature Documentary - 4K Wildlife Adventure",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&h=450&fit=crop",
      platform: "YouTube",
      duration: "15:42",
      views: "2.3M",
      publishedAt: "2 days ago",
      formats: [
        {
          quality: "4K Ultra HD",
          format: "mp4",
          size: "1.2 GB",
          downloadUrl: "#"
        },
        {
          quality: "1080p Full HD",
          format: "mp4", 
          size: "580 MB",
          downloadUrl: "#"
        },
        {
          quality: "720p HD",
          format: "mp4",
          size: "280 MB", 
          downloadUrl: "#"
        },
        {
          quality: "480p Standard",
          format: "mp4",
          size: "150 MB",
          downloadUrl: "#"
        },
        {
          quality: "Audio Only",
          format: "mp3",
          size: "25 MB",
          downloadUrl: "#"
        }
      ]
    };
  } else {
    return {
      title: "Beautiful sunset at the beach 🌅 #sunset #beach #nature",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&h=800&fit=crop",
      platform: "Instagram",
      duration: "0:30",
      publishedAt: "5 hours ago",
      formats: [
        {
          quality: "High Quality",
          format: "mp4",
          size: "45 MB",
          downloadUrl: "#"
        },
        {
          quality: "Standard Quality", 
          format: "mp4",
          size: "25 MB",
          downloadUrl: "#"
        }
      ]
    };
  }
};

// Mock function to handle download
export const handleDownload = (format: VideoFormat) => {
  // In a real app, this would trigger the actual download
  console.log(`Downloading ${format.quality} ${format.format}...`);
  
  // Create a mock download link
  const link = document.createElement('a');
  link.href = '#';
  link.download = `video.${format.format}`;
  link.click();
};