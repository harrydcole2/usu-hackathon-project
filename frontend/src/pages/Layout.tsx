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
        "hover:bg-slate-800",
        isActive ? "bg-slate-800 text-white font-medium" : "text-slate-400"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <div className="flex flex-col items-center justify-center py-6 border-b border-slate-800">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">User Name</h3>
          <p className="text-xs text-slate-400">username@email.com</p>
        </div>

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

        <div className="mt-auto pb-4 text-center text-xs text-slate-500">
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
