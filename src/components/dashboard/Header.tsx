import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navItems = ["Events", "Schedule", "Speakers", "Sponsors", "Team", "Contact", "Map", "Shop"];

  return (
    <header className="glass-card sticky top-0 z-50 mx-auto max-w-7xl">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <span className="text-lg font-bold">DC</span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-white/10">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-white/10">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="ml-2 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
