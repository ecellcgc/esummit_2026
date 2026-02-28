import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LongPasses from "../components/LongPasses";
// import ComingSoon from "./ComingSoon";

function LongPassesPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050005] text-white overscroll-none">
      <div className="relative z-[100] max-w-6xl mx-auto px-5 sm:px-6 pt-6 pb-0">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      <LongPasses />
    </div>
  );
}

export default LongPassesPage;
