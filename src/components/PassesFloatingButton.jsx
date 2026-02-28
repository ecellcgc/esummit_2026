import React from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

function PassesFloatingButton() {
  return (
    <Link
      to="/passes"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-center justify-center gap-3 py-5 px-3 overflow-hidden rounded-l-[2rem] bg-black border-2 border-l-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5),inset_0_0_0_1px_rgba(168,85,247,0.2)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6),inset_0_0_0_1px_rgba(168,85,247,0.3)] hover:border-purple-400 transition-all duration-300 min-h-[140px] w-[52px]"
      aria-label="Regional Pass - View passes"
    >
      <Ticket className="w-6 h-6 shrink-0 text-purple-500" strokeWidth={2} />
      <span
        className="text-white text-[10px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        REGIONAL PASS
      </span>
    </Link>
  );
}

export default PassesFloatingButton;
