// import { useState } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CourseNavbar, Sidebar } from "../components";

const CourseLayout = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log("Toggle", toggle);
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="w-full h-14 flex items-center bg-white fixed">
        <CourseNavbar handleToggle={handleToggle} />
      </div>

      {/* Sidebar & Main Content */}
      <div className="pt-14 md:pt-20 flex items-start  w-full">
        <div
          className={`hidden md:block h-screen fixed transition-all duration-300 ease-in-out ${
            toggle
              ? "w-[5%] md:w-[5%] lg:w-[5%]"
              : "w-[15%] md:w-[15%] lg:w-[15%]"
          }`}
        >
          <Sidebar toggle={toggle} />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ml-auto ${
            toggle
              ? "w-full md:w-[91%] lg:w-[96%]"
              : "w-full md:w-[90%] lg:w-[85%]"
          }`}
        >
          <div className="layout ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
