import { useState } from "react";
import { Link } from "react-router";
import { NotificationProps } from "../../../interfaces";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./styles/DesktopNotifications.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface DesktopNotificationProps {
  data?: NotificationProps[];
}

export const DesktopNotifications: React.FC<DesktopNotificationProps> = () => {
  const { logout, getUserInfo } = useAuth();
  const userInfo = getUserInfo();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const handleUserMenuToggle = () => setShowUserMenu((prev) => !prev);
  const handleNotificationMenuToggle = () =>
    setShowNotificationMenu((prev) => !prev);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <ul className={cx("navList")}>
      <li className={cx("listItem")}>
        <a
          href="#"
          className={cx("notificationToggle")}
          onClick={(e) => {
            e.preventDefault();
            handleNotificationMenuToggle();
          }}
        >
          <i className="bi bi-bell fs-4"></i>
        </a>
        {showNotificationMenu && (
          <div className={cx("notificationDropdown")}>
            <div className={cx("dropdownContent")}>
              <div
                className={cx(
                  "borderBottom",
                  "d-flex",
                  "justify-content-between",
                  "align-items-end"
                )}
              >
                <span className="h4 mb-0">Notifications</span>
                <Link to="/" className="text-muted">
                  <i className="fe fe-settings me-1 align-middle" />
                </Link>
              </div>
              <div className={cx("borderTop")}>
                <Link
                  to="/dashboard/notification-history"
                  className={cx("seeAllLink")}
                >
                  See all Notifications
                </Link>
              </div>
            </div>
          </div>
        )}
      </li>

      <li className={cx("listItem", "ms-2")}>
        <a
          href="#"
          className={cx("userToggle")}
          onClick={(e) => {
            e.preventDefault();
            handleUserMenuToggle();
          }}
        >
          <i className="bi bi-person-circle fs-3"></i>
        </a>
        {showUserMenu && (
          <div className={cx("userDropdown")}>
            <div className={cx("profileInfo")}>
              <h5 className="mb-1">
                {userInfo?.name} - {userInfo?.role}
              </h5>
              <hr className={cx("divider")} />
            </div>
            <Link to="#" className={cx("dropdownItem")}>
              <i className="fe fe-user me-2" /> Edit Profile
            </Link>
            <Link to="#" className={cx("dropdownItem")}>
              <i className="fe fe-settings me-2" /> Setting Account
            </Link>
            <div
              className={cx("dropdownItem", "text-danger")}
              onClick={handleLogout}
            >
              <i className="fe fe-power me-2" /> logout
            </div>
          </div>
        )}
      </li>
    </ul>
  );
};
