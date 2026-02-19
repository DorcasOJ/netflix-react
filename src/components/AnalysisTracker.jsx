import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnalysisTracker = () => {
  const location = useLocation();
  const id = import.meta.env.VITE_MEASUREMENT_ID2;

  useEffect(() => {
    window.gtag("config", id, {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

export default AnalysisTracker;
