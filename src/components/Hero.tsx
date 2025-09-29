import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Youtube, Instagram, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroProps {
  onUrlSubmit: (url: string) => void;
  isLoading?: boolean;
}

export const Hero = ({ onUrlSubmit, isLoading = false }: HeroProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid YouTube or Instagram URL",
        variant: "destructive",
      });
      return;
    }

    const isValidUrl = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("instagram.com");
    
    if (!isValidUrl) {
      toast({
        title: "Invalid URL",
        description: "Only YouTube and Instagram URLs are supported",
        variant: "destructive",
      });
      return;
    }

    onUrlSubmit(url);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        {/* Logo & Title */}
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-primary rounded-2xl mb-6 animate-glow">
            <Download className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            MediaGrabber
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Download videos from <span className="text-red-400 font-semibold">YouTube</span> and{" "}
            <span className="text-pink-400 font-semibold">Instagram</span> with ease
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 animate-scale-in">
          <div className="relative bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Paste YouTube or Instagram URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  className="h-14 text-lg bg-background/50 border-border/30 focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/70"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="h-14 px-8 bg-gradient-accent hover:shadow-accent transition-all duration-300 text-accent-foreground font-semibold hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Grab Video
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Supported Platforms */}
        <div className="flex items-center justify-center gap-8 text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/30 rounded-lg border border-border/30">
            <Youtube className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium">YouTube</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-card/30 rounded-lg border border-border/30">
            <Instagram className="h-5 w-5 text-pink-400" />
            <span className="text-sm font-medium">Instagram</span>
          </div>
        </div>
      </div>
    </div>
  );
};