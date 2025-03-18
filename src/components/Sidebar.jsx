import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiSquaresPlus } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { HiOutlineDownload } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";

const Sidebar = ({ toggle }) => {
  const active = "bg-[#26D0CE]";
  const inactive = "bg-white";
  return (
    <div className="w-full">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all mb-2 duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <AiOutlineHome className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Home</span>}
      </NavLink>
      <NavLink
        to="/page"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <HiSquaresPlus className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Home</span>}
      </NavLink>
      <NavLink
        to="/page"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <FaHeart className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Home</span>}
      </NavLink>
      <NavLink
        to="/page"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <TiDocumentText className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Home</span>}
      </NavLink>
      <NavLink
        to="/page"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <HiOutlineDownload className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Home</span>}
      </NavLink>
      <NavLink
        to="/page"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#26D0CE] text-white" : "bg-white text-black"
          } flex items-center py-2.5 transition-all duration-300 ease-in-out ${
            toggle ? "justify-center px-2" : "gap-x-4 px-8"
          }`
        }
      >
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <LuSettings className="w-7 h-7" />
        </div>
        {!toggle && <span className="text-lg font-semibold">Setting</span>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
