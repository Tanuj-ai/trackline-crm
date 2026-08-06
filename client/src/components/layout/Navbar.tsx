import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <Bell size={20} />

        <div className="text-right">

          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-400">
            {user?.role}
          </p>

        </div>

      </div>

    </header>
  );
};

export default Navbar;