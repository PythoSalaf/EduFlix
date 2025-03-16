import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

const Layout = () => {
  return (
    <div className="w-full">
      <div className="w-full h-14 shadow flex items-center  fixed ">
        <Navbar />
      </div>
      <div className="pt-14.5 flex items-start w-full">
        <div className="hidden md:block md:w-[20%] lg:w-[15%] h-screen fixed bg-amber-300">
          <Sidebar />
        </div>
        <div className="w-full md:w-[80%] lg:w-[85%] ml-auto bg-red-700">
          <div className="layout">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
