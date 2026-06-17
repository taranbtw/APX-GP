import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  LayoutDashboard,
  Radio,
  Activity,
  FlaskConical,
  History,
  Users,
  Flag,
  MapPinned,
  Trophy,
  Calendar,
} from "lucide-react";

const menu = [
  {
    title: "OPERATIONS",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
      },
      {
        name: "Live",
        icon: Radio,
        path: "/live",
      },
      {
        name: "Telemetry",
        icon: Activity,
        path: "/telemetry",
      },
      {
        name: "Strategy Lab",
        icon: FlaskConical,
        path: "/strategy",
      },
      {
        name: "Replay",
        icon: History,
        path: "/replay",
      },
    ],
  },
  {
    title: "REFERENCE",
    items: [
      {
        name: "Drivers",
        icon: Users,
        path: "/drivers",
      },
      {
        name: "Teams",
        icon: Flag,
        path: "/teams",
      },
      {
        name: "Circuits",
        icon: MapPinned,
        path: "/circuits",
      },
      {
        name: "Standings",
        icon: Trophy,
        path: "/standings",
      },
      {
        name: "Calendar",
        icon: Calendar,
        path: "/calendar",
      },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-zinc-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-900">
        <img src={logo} alt="APXGP" className="w-36 mx-auto" />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6">
        {menu.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="text-[10px] tracking-[0.3em] text-zinc-500 mb-4 px-3">
              {section.title}
            </h3>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />

                    <span className="text-sm">{item.name}</span>

                    {item.name === "Live" && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="p-3 border-t border-zinc-900">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500">
          Search...
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
