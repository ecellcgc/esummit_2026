import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ComingSoon({ title = "Page" }) {
  return (
    <div className="min-h-screen bg-[#050005] text-white flex flex-col items-center justify-center">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050005] to-[#050005] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <div className="relative z-10 text-center px-6">
        <h1 className="font-sans text-4xl md:text-6xl font-bold text-white uppercase tracking-widest mb-4">
          {title}
        </h1>
        <p className="font-sans text-xl md:text-2xl text-purple-300/90 uppercase tracking-widest">
          Coming Soon
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full mt-8" />
      </div>
    </div>
  );
}

export default ComingSoon;
