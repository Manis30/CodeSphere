import {
  FaBell,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import profile from "../../../assets/signup.png"; 
import { NavLink } from "react-router";

export default function UserNavbar() {
  return (
    <header className="h-18 bg-[#0B1120] border-b border-slate-800 flex items-center justify-end px-8">

      <div className="flex items-center gap-8">


        <NavLink
          to="/"
          className="relative text-slate-400 hover:text-white transition"
        >
          <FaBell size={22} />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
            3
          </span>

        </NavLink>
        <NavLink
          to="/"
          className="relative text-slate-400 hover:text-white transition"
        >
          <FaEnvelope size={22} />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
            2
          </span>

        </NavLink>

        {/* Settings */}

        <NavLink
          to="/"
          className="text-slate-400 hover:text-white transition"
        >
          <FaCog size={22} />
        </NavLink>

        {/* Profile */}

        <NavLink
          to="/profile"
          className="flex items-center gap-3"
        >

          <img
            src={profile}
            alt="profile"
            className="w-11 h-11 rounded-full border-2 border-violet-500 object-cover"
          />

        </NavLink>

      </div>

    </header>
  );
}