//import node module libraries
import { Outlet } from "react-router";
import Header from "../components/navbars/topbar/Header";
import { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import Sidebar from "../components/navbars/Sidebar";

const RootLayout = () => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  return (
    <section>
      <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
        <div className="navbar-vertical navbar">
          <Sidebar />
        </div>
        <div id="page-content">
          <div className="header">
            <Header toggleMenu={ToggleMenu} />
          </div>
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        style={{ width: "100%" }}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
        pauseOnFocusLoss={false}
        theme="light"
        autoClose={2000}
        transition={Slide}
      />
    </section>
  );
};

export default RootLayout;
