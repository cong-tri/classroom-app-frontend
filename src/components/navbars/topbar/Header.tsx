import { Nav, Navbar } from "react-bootstrap";
import Notifications from "./Notifications";
import Breadcrumbs from "../../breadcrumb/BreadCrumbs";

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-white shadow-sm px-3">
        <div className="d-flex w-100 align-items-center">
          <div className="d-flex align-items-center">
            <button
              id="nav-toggle"
              className="btn btn-link nav-icon me-2 icon-xs p-0"
              onClick={toggleMenu}
              aria-label="Toggle sidebar menu"
            >
              <i className="bi bi-layout-text-sidebar text-primary fs-3"></i>
            </button>
          </div>
          <Breadcrumbs />
          <Nav className="navbar-right-wrap ms-auto d-flex align-items-center">
            <Notifications />
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
