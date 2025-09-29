import { useState, useEffect } from "react";

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  platform: string;
  status: "success" | "failed" | "processing";
  timestamp: Date;
  thumbnail?: string;
}

export const useDownloadHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("mediaGrabberHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error("Failed to parse history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("mediaGrabberHistory", JSON.stringify(history));
    }
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, "id" | "timestamp">, customId?: string) => {
    const newItem: HistoryItem = {
      ...item,
      id: customId || Date.now().toString(),
      timestamp: new Date(),
    };

    setHistory((prev) => [newItem, ...prev].slice(0, 50)); // Keep only last 50 items
    return newItem.id;
  };

  const updateHistoryStatus = (id: string, status: HistoryItem["status"], title?: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id 
          ? { 
              ...item, 
              status,
              ...(title && { title })
            } 
          : item
      )
    );
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("mediaGrabberHistory");
  };

  return {
    history,
    addToHistory,
    updateHistoryStatus,
    clearHistory,
  };
};