import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  platform: string;
  status: "success" | "failed" | "processing";
  timestamp: Date;
  thumbnail?: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("mediaGrabberHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
      setHistory(parsedHistory);
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("mediaGrabberHistory");
    toast({
      title: "History cleared",
      description: "All download history has been removed",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "processing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero p-4 pb-20">
        <div className="max-w-2xl mx-auto pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
            Download History
          </h1>
          
          <div className="text-center py-16">
            <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No downloads yet
            </h3>
            <p className="text-muted-foreground">
              Your download history will appear here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Download History
          </h1>
          
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-red-500 border-red-500/20 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="bg-card/50 border-border/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{item.platform}</span>
                    <span>•</span>
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">
                    {item.url}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;