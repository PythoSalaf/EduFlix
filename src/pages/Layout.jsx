import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    if (true) {
      setToggle(!toggle);
    }
    console.log("Toggle", toggle);
  };
  return (
    <div className="w-full">
      <div className="w-full h-14 flex items-center  fixed ">
        <Navbar handleToggle={handleToggle} />
      </div>
      <div className="pt-20 flex items-start w-full">
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
              ? "w-[91%] md:w-[91%] lg:w-[91%] mx-auto"
              : "w-[83%] md:w-[83%] lg:w-[83%] "
          }`}
        >
          <div className="layout">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
