import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useAuth } from "../../../contexts/AuthContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function SideBar() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [headerProfile, setHeaderProfile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const headerProfileClick = () => {
    setHeaderProfile(!headerProfile);
  };
  const handleLogout = () => {
    logout();
    navigate(ROUTES.loginSignup, { replace: true });
  };
  return (
    <>
      <div
        className={`nav-left-sidebar sidebar-dark ${collapsed ? "collapsed" : ""}`}
      >
        <div className="menu-list">
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              onClick={() => setOpen(!open)}
              className="navbar-toggler s"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a
              onClick={headerProfileClick}
              className="nav-link nav-user-img mobile"
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
            <div
              className={`collapse navbar-collapse ${open && "show"}`}
              id="navbarNav"
            >
              <ul className="navbar-nav flex-column">
                <li className="nav-divider">Menu</li>
                {user && user.user_info.role === "owner" ? (
                  <>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.adminDashboard}
                      >
                        <i className="fa fa-fw fa-database"></i>{" "}
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.adminStores}
                      >
                        <i className="fa fa-building"></i> <span>Stores</span>
                      </NavLink>
                    </li>
                    {storeId && (
                      <>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminAddCategory(storeId)}
                          >
                            <i className="fa fa-fw fa-bars"></i>{" "}
                            <span>Categories</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminAddServices(storeId)}
                          >
                            <i className="fa fa-fw fa-th"></i>{" "}
                            <span>Services</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminBookings(storeId)}
                          >
                            <i className="fa fa-fw fa-calendar-alt"></i>{" "}
                            <span>Bookings</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminPortfolio(storeId)}
                          >
                            <i className="fa fa-fw fa-calendar-alt"></i>{" "}
                            <span>Portfolio</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminAddWorkingHours(storeId)}
                          >
                            <i className="fa fa-hourglass-half"></i>{" "}
                            <span>Working Hours</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminAddTeamMembers(storeId)}
                          >
                            <i className="fa fa-users"></i>{" "}
                            <span>Team Members</span>
                          </NavLink>
                        </li>
                        <li className="nav-item child-nav-vendor">
                          <NavLink
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                            to={ROUTES.getAdminReviews(storeId)}
                          >
                            <i className="fa fa-fw fa-gem"></i>{" "}
                            <span>Reviews</span>
                          </NavLink>
                        </li>
                      </>
                    )}
                  </>
                ) : user.user_info.role === "worker" ? (
                  <>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.workerDashboard}
                      >
                        <i className="fa fa-fw fa-database"></i>{" "}
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.workerBookings}
                      >
                        <i className="fa fa-fw fa-calendar-alt"></i>{" "}
                        <span>Bookings</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.workerReviews}
                      >
                        <i className="fa fa-gem"></i> <span>Your Reviews</span>
                      </NavLink>
                    </li>
                  </>
                ) : user.user_info.role === "master-admin" ? (
                  <>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminDashboard}
                      >
                        <i className="fa fa-fw fa-database"></i>{" "}
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminUsers}
                      >
                        <i className="fa fa-fw fa-users"></i> <span>Users</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminServicesCategories}
                      >
                        <i className="fa fa-fw fa-bars"></i>{" "}
                        <span>Categories</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminServices}
                      >
                        <i className="fa fa-fw fa-th"></i> <span>Services</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminStores}
                      >
                        <i className="fa fa-fw fa-building"></i>{" "}
                        <span>Stores</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminBookings}
                      >
                        <i className="fa fa-fw fa-calendar-alt"></i>{" "}
                        <span>Bookings</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminReviews}
                      >
                        <i className="fa fa-fw fa-gem"></i> <span>Reviews</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminBlogs}
                      >
                        <i className="fa fa-fw fa-gem"></i> <span>Blogs</span>
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        to={ROUTES.masterAdminInqueries}
                      >
                        <i className="fa fa-question-circle"></i>{" "}
                        <span>Inqueries</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
                {/* <li className="nav-item" onClick={() => setCollapsed(!collapsed)}>
                                    <NavLink className="nav-link">
                                        <button 
                                            className="collapse-btn" 
                                            onClick={() => setCollapsed(!collapsed)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                width: '30px',
                                                height: '30px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {collapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
                                        </button>
                                    </NavLink>
                                </li> */}
                {/* <li className="nav-item ">
                                    <NavLink className="nav-link active" onclick={(e) => handleLogout}><i className="fa fa-fw fa-gem"></i> <span>Logout</span></NavLink>
                                </li> */}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {headerProfile ? (
        <div
          className="dropdown-menu dropdown-menu-right nav-user-dropdown"
          style={{ display: "block", top: "130px" }}
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
    </>
  );
}

export default SideBar;
