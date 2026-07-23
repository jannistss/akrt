"use client";

import { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

export function VercelAnalytics() {
  useEffect(() => {
    const analyticsId = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID;

    if (!analyticsId) {
      return;
    }

    const vitalsUrl = "https://vitals.vercel-analytics.com/v1/web";

    const getConnectionSpeed = () => {
      if ("connection" in navigator) {
        const conn = (navigator as any).connection;
        return conn?.effectiveType;
      }
      return "";
    };

    const sendToVercelAnalytics = (metric: any) => {
      const body = {
        dsn: analyticsId,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        page: window.location.pathname,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        event_category: metric.delta ? metric.delta.toString() : "",
        event_label: metric.id,
        speed: getConnectionSpeed(),
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, JSON.stringify(body));
      } else {
        fetch(vitalsUrl, {
          method: "POST",
          body: JSON.stringify(body),
          keepalive: true,
        }).catch(() => {});
      }
    };

    getCLS(sendToVercelAnalytics);
    getFID(sendToVercelAnalytics);
    getFCP(sendToVercelAnalytics);
    getLCP(sendToVercelAnalytics);
    getTTFB(sendToVercelAnalytics);
  }, []);

  return null;
}
