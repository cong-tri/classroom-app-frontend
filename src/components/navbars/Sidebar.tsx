// import node module libraries
import { Fragment } from "react";
import { Accordion } from "react-bootstrap";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import { Link, useLocation } from "react-router";
import type { SideBarProps } from "../../interfaces";
import { SIDEBAR } from "../../data/sideBar";

const SidebarItem = ({ item }: { item: SideBarProps }) => {
  const location = useLocation();

  return (
    <li className="nav-item text-center">
      <Link
        to={item.path}
        className={`nav-link ${
          location.pathname === item.path ? "active" : ""
        }`}
      >
        {item.title}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar-sticky-header">
        <Link to="/" className="navbar-brand me-0">
          <h3>Classroom Management App</h3>
        </Link>
      </div>
      <SimpleBar className="mw-100" style={{ maxHeight: "80vh" }}>
        <div className="sidebar-scrollable">
          <Accordion as="ul" className="navbar-nav flex-column h-100">
            {SIDEBAR.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </Accordion>
        </div>
      </SimpleBar>
    </Fragment>
  );
};

export default Sidebar;
