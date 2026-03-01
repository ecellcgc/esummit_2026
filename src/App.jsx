import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TermsAndConditions from "./pages/TermsAndConditions";
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import LongPassesPage from "./pages/LongPassesPage";
import Events from "./pages/Events";
import ComingSoon from "./pages/ComingSoon";
import EventRegistration from "./pages/EventRegistration";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.css";

const queryClient = new QueryClient();

import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = React.useState(() => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname || "";
    const rootPaths = ["/", "", "/esummit", "/esummit/"];
    const isRootPage = rootPaths.includes(path);
    if (!isRootPage) return false;
    // Play loading on all screens (including small/mobile). LoadingScreen has mobile autoplay fallbacks.
    return true;
  });

  // if (loading) {
  //   return <LoadingScreen onComplete={() => setLoading(false)} />
  // }

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <>
            <Routes>
              <Route path="/esummit" element={<Home />} />
              <Route path="/esummit/" element={<Home />} />
              {/* <Route path="/esummit" element={<Navigate to="/" replace />} />
              <Route path="/esummit/" element={<Navigate to="/" replace />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route
                path="/privacy"
                element={
                  <React.Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                    <PrivacyPolicy />
                  </React.Suspense>
                }
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/passes" element={<LongPassesPage />} />
              <Route path="/events" element={<Events />} />
              <Route
                path="/event-registration"
                element={
                  <ProtectedRoute>
                    <EventRegistration />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/event-registration" element={<ComingSoon title="Event Registration" />} /> */}
              <Route path="/team" element={<ComingSoon title="Team" />} />
              <Route path="/expo" element={<ComingSoon title="Expo" />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
