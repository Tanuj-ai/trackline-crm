import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-orange-500">
          Trackline CRM
        </h1>

      </div>

      <nav className="flex-1 px-4 space-y-2">

        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 text-slate-300"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 text-slate-300"
        >
          <Users size={18} />
          Leads
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 text-slate-300"
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      <button
        onClick={logout}
        className="m-4 flex items-center justify-center gap-2 rounded-lg bg-red-500 py-3 hover:bg-red-600"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;