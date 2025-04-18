import { MdMenu } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseNavbar = () => {
  return (
    <nav className="w-full">
      <div className="layout flex items-center justify-between">
        <div className="flex items-center gap-x-4 w-full">
          {/* <MdMenu
            className="size-7 hidden md:block cursor-pointer "
            onClick={handleToggle}
          /> */}
          <Link to="/">
            <h2 className="text-[#1a2980] text-2xl font-bold">
              Edu-<span className="text-[#26d0ce] italic">Flix</span>
            </h2>
          </Link>
          {/* <div className="linear h-9 w-14 rounded-lg"></div> */}
        </div>
        <div className="hidden md:block w-full">
          <input
            type="text"
            className="h-9 w-full border border-[#dadada] rounded-2xl"
          />
        </div>
        <div className="w-full hidden  md:flex items-center gap-x-4 justify-end">
          <div className="bg-[#D9D9D9] flex items-center cursor-pointer justify-center rounded-full size-9">
            <MdOutlineDarkMode className="size-[65%]" />
          </div>
          <div className="bg-[#D9D9D9] flex items-center cursor-pointer justify-center rounded-full size-9">
            <IoMdNotificationsOutline className="size-[65%]" />
          </div>
          <div className="bg-[#D9D9D9] flex items-center cursor-pointer justify-center rounded-full size-9">
            <FaRegUser className="size-[65%]" />
          </div>
          {/* <button className="linear text-white py-2 px-4 rounded-3xl">
            Connect Wallet
          </button> */}
        </div>
        <div className="md:hidden">
          <MdMenu className="size-8" />
        </div>
      </div>
    </nav>
  );
};

export default CourseNavbar;
