import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"

const Sidebar = () => {
    return (
      <div className="w-64 h-auto bg-[#101010] text-white p-6 border-r border-[#FAF7F0]">
        <img src={logo} alt="Logo" className="mx-auto my-4" />

        <div className="text-sm opacity-75">OVERVIEW</div>

        <div className="space-y-4">
          <Link
            to="/"
            className="block hover:bg-zinc-900 rounded-xl hover:text-red-500"
          >
            Dashboard
          </Link>

          <Link to="/live" className="block hover:text-red-500">
            Live Race
          </Link>
        </div>
      </div>
    );
}

export default Sidebar;