import { Trophy } from "lucide-react";

interface StatsCardProps {
  value: string | number;
  label: string;
}

const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <div className="glass-card-hover flex flex-col items-center justify-center p-6 h-full">
      <div className="flex items-start gap-2">
        <span className="text-4xl font-bold text-white">{value}</span>
        <Trophy className="h-6 w-6 text-purple-400" />
      </div>
      <p className="mt-2 text-sm text-zinc-300">{label}</p>
    </div>
  );
};

export default StatsCard;
