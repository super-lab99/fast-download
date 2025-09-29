import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-gradient-card border-border/50 shadow-card animate-scale-in">
          <CardContent className="p-12 text-center">
            {/* Loading Icon */}
            <div className="inline-flex items-center justify-center p-4 bg-gradient-primary rounded-full mb-6 animate-glow">
              <Download className="h-8 w-8 text-primary-foreground animate-float" />
            </div>

            {/* Loading Text */}
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Processing Your Video
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We're extracting video information and available formats. This may take a moment...
            </p>

            {/* Animated Loader */}
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <span className="text-sm font-medium text-muted-foreground">
                Analyzing video...
              </span>
            </div>

            {/* Progress Indicator */}
            <div className="mt-8">
              <div className="w-full h-2 bg-background/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary animate-pulse rounded-full w-3/4 transition-all duration-1000" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};