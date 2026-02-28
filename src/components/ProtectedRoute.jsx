import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getMe } from "@/lib/api";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isOnboardingPage = location.pathname === "/onboarding";
  const [onboardingCheck, setOnboardingCheck] = useState(
    isOnboardingPage ? "skip" : "pending"
  );

  useEffect(() => {
    if (!isAuthenticated()) return;
    if (isOnboardingPage) {
      setOnboardingCheck("skip");
      return;
    }
    let cancelled = false;
    getMe()
      .then((user) => {
        if (cancelled) return;
        if (user && user.onboardingCompletedAt == null) {
          setOnboardingCheck("redirect");
        } else {
          setOnboardingCheck("ok");
        }
      })
      .catch(() => {
        if (!cancelled) setOnboardingCheck("ok");
      });
    return () => {
      cancelled = true;
    };
  }, [isOnboardingPage]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isOnboardingPage && onboardingCheck === "redirect") {
    return <Navigate to="/onboarding" replace />;
  }

  if (!isOnboardingPage && onboardingCheck === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <p className="text-white/80">Loading…</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
