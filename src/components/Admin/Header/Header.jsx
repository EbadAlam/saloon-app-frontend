import React, { useState } from "react";
import "../css/bootstrap/css/bootstrap.min.css";
import "../css/fonts/circular-std/style.css";
import "../css/fonts/fontawesome/css/fontawesome-all.css";
import "../css/fonts/material-design-iconic-font/css/materialdesignicons.min.css";
import "../css/libs/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Loader from "../../Loader/Loader";
import { ROUTES } from "../../../routes";

function Header() {
  const { user, logout } = useAuth();
  const [headerProfile, setHeaderProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const headerProfileClick = () => {
    setHeaderProfile(!headerProfile);
  };
  const handleLogout = () => {
    logout();
    navigate(ROUTES.loginSignup, {
      replace: true,
      state: { redirectToState: "home" },
    });
  };
  return (
    <div className="dashboard-header">
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <Link className="navbar-brand" style={{ color: "#333333" }}>
          Saloon Appointment
        </Link>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          {loading ? (
            <Loader />
          ) : (
            <ul className="navbar-nav ml-auto navbar-right-top">
              <li className="nav-item dropdown nav-user">
                <a
                  onClick={headerProfileClick}
                  className="nav-link nav-user-img"
                  href="#"
                  id="navbarDropdownMenuLink2"
                >
                  {user.user_info?.profile_image ? (
                    user.user_info?.signup_platform == "manual" ? (
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}/${user.user_info.profile_image}`}
                        alt=""
                        className="user-avatar-md rounded-circle"
                      />
                    ) : (
                      <img
                        src={user.user_info.profile_image}
                        alt=""
                        className="user-avatar-md rounded-circle"
                      />
                    )
                  ) : (
                    <img
                      src={`https://avatar.iran.liara.run/public/boy?username=${user.username}`}
                      alt=""
                      className="user-avatar-md rounded-circle"
                    />
                  )}
                </a>
                {headerProfile ? (
                  <div
                    className="dropdown-menu dropdown-menu-right nav-user-dropdown"
                    style={{ display: "block" }}
                  >
                    <div className="nav-user-info">
                      <h5 className="mb-0 text-white nav-user-name text-capitalize">
                        {user.username}
                      </h5>
                    </div>
                    <a
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                    >
                      <i className="fas fa-power-off mr-2"></i>Logout
                    </a>
                  </div>
                ) : null}
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
