import { Check, CreditCard, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Pass {
  name: string;
  price: string;
  originalPrice?: string;
  gradient: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const passes: Pass[] = [
  {
    name: "SILVER PASS",
    price: "FREE",
    originalPrice: "₹99",
    gradient: "gradient-slate",
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    name: "GOLD PASS",
    price: "₹199",
    originalPrice: "₹499",
    gradient: "gradient-gold",
    icon: <Sparkles className="h-8 w-8" />,
    isActive: true,
  },
  {
    name: "PLATINUM PASS",
    price: "₹399",
    originalPrice: "₹999",
    gradient: "gradient-teal",
    icon: <Crown className="h-8 w-8" />,
  },
];

const PassCard = () => {
  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Your Pass</h2>
        </div>
        <span className="badge-status">
          <Check className="h-3 w-3" />
          Active
        </span>
      </div>

      <p className="mb-4 text-center text-sm text-muted-foreground">
        Choose your pass to get started
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {passes.map((pass) => (
          <div
            key={pass.name}
            className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${pass.gradient}`}
          >
            {pass.isActive && (
              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="mb-4 flex justify-center">{pass.icon}</div>
            <h3 className="text-center text-lg font-bold">{pass.name}</h3>
            <div className="mt-2 text-center">
              {pass.originalPrice && (
                <span className="mr-2 text-sm line-through opacity-60">
                  {pass.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold">{pass.price}</span>
            </div>
            <Button
              className="mt-4 w-full bg-white/20 hover:bg-white/30"
              variant="ghost"
            >
              {pass.isActive ? "Current Pass" : "Get Pass"}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Upgrade Your Pass
        </h4>
        <div className="glass-card flex items-center justify-between border-accent/30 p-4">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-accent" />
            <span className="font-medium text-accent">PLATINUM PASS</span>
          </div>
          <span className="text-sm">Upgrade ₹200</span>
        </div>
        <div className="glass-card flex items-center justify-between border-primary/30 p-4">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">PRIORITY PASS</span>
          </div>
          <span className="text-sm">Upgrade ₹1100</span>
        </div>
      </div>
    </div>
  );
};

export default PassCard;
