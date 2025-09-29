import { useState } from "react";
import { Hero } from "@/components/Hero";
import { VideoPreview } from "@/components/VideoPreview";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { processVideoUrl, handleDownload, VideoData, VideoFormat } from "@/data/mockVideoData";
import { useToast } from "@/hooks/use-toast";

type AppState = "idle" | "loading" | "success" | "error";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const handleUrlSubmit = async (url: string) => {
    setState("loading");
    setError("");
    
    try {
      const data = await processVideoUrl(url);
      setVideoData(data);
      setState("success");
      
      toast({
        title: "Video processed successfully!",
        description: "Choose your preferred quality and format to download.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process video URL";
      setError(errorMessage);
      setState("error");
    }
  };

  const handleFormatSelect = (format: VideoFormat) => {
    handleDownload(format);
    
    toast({
      title: "Download started!",
      description: `Downloading ${format.quality} ${format.format}`,
    });
  };

  const handleRetry = () => {
    setState("idle");
    setVideoData(null);
    setError("");
  };

  // Render different states
  if (state === "loading") {
    return <LoadingState />;
  }

  if (state === "error") {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  if (state === "success" && videoData) {
    return <VideoPreview video={videoData} onFormatSelect={handleFormatSelect} />;
  }

  return <Hero onUrlSubmit={handleUrlSubmit} isLoading={false} />;
};

export default Index;
