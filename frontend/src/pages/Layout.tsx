import { Outlet, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Home, Package, Utensils, HelpCircle } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        "hover:bg-sidebar-border/20",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground/80"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default function Layout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar with custom theme colors */}
      <div className="w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        {/* User profile */}
        <div className="flex flex-col items-center justify-center py-6 border-b border-sidebar-border/30">
          <Avatar className="h-16 w-16 mb-2 ring-2 ring-sidebar-ring/30">
            <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              UN
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium">User Name</h3>
          <p className="text-xs text-sidebar-foreground/70">
            username@email.com
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1">
          <NavItem to="/" icon={<Home size={18} />} label="Home" />
          <NavItem to="/pantry" icon={<Package size={18} />} label="Pantry" />
          <NavItem
            to="/recipes"
            icon={<Utensils size={18} />}
            label="Recipes"
          />
          <NavItem to="/help" icon={<HelpCircle size={18} />} label="Help" />
        </nav>

        <div className="mt-auto pb-4 text-center text-xs text-sidebar-foreground/50">
          Food Manager v1.0
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
