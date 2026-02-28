import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MerchBanner = () => {
  return (
    <div className="gradient-green glass-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Event Merchandise</p>
            <p className="text-sm text-white/80">T-Shirts, Hoodies, Tote Bags & more from ₹229!</p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="gap-2 bg-white/10 text-white hover:bg-white/20"
        >
          Shop Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MerchBanner;
