import { useEffect, useState } from "react";

interface VisitorResponse {
  success: boolean;
  counted: boolean;
  isNewVisitor: boolean;
  isNewSession: boolean;
  totalVisitors: number;
  sessionVisitors: number;
  message: string;
}

export const useVisitorTracking = (
  serverUrl: string = "http://api.cio.football",
) => {
  const [trackingStatus, setTrackingStatus] = useState<{
    isTracked: boolean;
    isNewVisitor: boolean;
    error: string | null;
  }>({
    isTracked: false,
    isNewVisitor: false,
    error: null,
  });

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch(`${serverUrl}/visitors/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for session cookies
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: VisitorResponse = await response.json();

        setTrackingStatus({
          isTracked: data.counted,
          isNewVisitor: data.isNewVisitor,
          error: null,
        });
      } catch (error) {
        setTrackingStatus((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    };

    trackVisitor();
  }, [serverUrl]);

  return trackingStatus;
};
