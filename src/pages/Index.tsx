import { useState } from "react";
import { Hero } from "@/components/Hero";
import { VideoPreview } from "@/components/VideoPreview";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { processVideoUrl, handleDownload, VideoData, VideoFormat } from "@/data/mockVideoData";
import { useToast } from "@/hooks/use-toast";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

type AppState = "idle" | "loading" | "success" | "error";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const { addToHistory, updateHistoryStatus } = useDownloadHistory();

  const handleUrlSubmit = async (url: string) => {
    setState("loading");
    setError("");
    
    // Add to history with processing status
    const platform = url.includes("youtube.com") || url.includes("youtu.be") ? "YouTube" : "Instagram";
    const processingId = Date.now().toString();
    
    const historyId = addToHistory({
      url,
      title: "Processing...",
      platform,
      status: "processing",
    }, processingId);
    
    try {
      const data = await processVideoUrl(url);
      setVideoData(data);
      setState("success");
      
      // Update history with success status and actual title
      updateHistoryStatus(historyId, "success", data.title);
      
      toast({
        title: "Video processed successfully!",
        description: "Choose your preferred quality and format to download.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process video URL";
      setError(errorMessage);
      setState("error");
      
      // Update history with failed status
      updateHistoryStatus(historyId, "failed");
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
