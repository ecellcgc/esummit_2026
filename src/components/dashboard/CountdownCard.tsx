import { Clock } from "lucide-react";

interface CountdownCardProps {
  targetDate?: string; // Optional prop for backend integration
  location?: string;
}

const CountdownCard = ({ targetDate = "2026-03-18T09:00:00", location = "CGC Landran" }: CountdownCardProps) => {
  // Logic to calculate time remaining could be added here using targetDate
  // For now, keeping static placeholders or calculating if needed

  const timeUnits = [
    { value: "00", label: "DAYS" },
    { value: "00", label: "HOURS" },
    { value: "00", label: "MINUTES" },
    { value: "00", label: "SECONDS" },
  ];

  return (
    <div className="glass-card-hover p-6 h-full flex flex-col justify-center">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-white">Event Starts In</span>
      </div>

      <div className="flex justify-center gap-3">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-2xl font-bold text-white">
              {unit.value}
            </div>
            <span className="mt-1 block text-[10px] text-zinc-400 uppercase tracking-wider">{unit.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-zinc-300">
        {new Date(targetDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} • {location}
      </p>
    </div>
  );
};

export default CountdownCard;
