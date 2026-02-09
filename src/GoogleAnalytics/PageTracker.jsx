import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { pageview } from "./Analytics";

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
}