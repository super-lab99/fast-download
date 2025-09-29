import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-gradient-card border-border/50 shadow-card animate-scale-in">
          <CardContent className="p-12 text-center">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center p-4 bg-destructive/20 rounded-full mb-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>

            {/* Error Text */}
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Oops! Something went wrong
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {message}
            </p>

            {/* Action Button */}
            <Button 
              onClick={onRetry}
              className="bg-gradient-accent hover:shadow-accent transition-all duration-300 text-accent-foreground font-semibold hover:scale-105"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};