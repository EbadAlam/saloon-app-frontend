import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Box, Button, IconButton, Drawer } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const { user, token } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === ROUTES.home;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const menuItems = [
    { label: "Stores", href: ROUTES.getCategoryPage('all') },
    { label: "Pricing", href: ROUTES.pricing },
    { label: "For Professionals", href: ROUTES.forBusiness },
    { label: "Blogs", href: ROUTES.blogs },
    { label: "Contact Us", href: ROUTES.contact },
  ];

  return (
    <header className="new-header">
      <div className="container">
        <div className="header-desktop">
          <div className="logo-div">
            <Link to={ROUTES.home}>
              <div className="logo">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    <path d="M20 3v4"></path>
                    <path d="M22 5h-4"></path>
                    <path d="M4 17v2"></path>
                    <path d="M5 18H3"></path>
                  </svg>
                </div>
                <h4>Beauty hub</h4>
              </div>
            </Link>
          </div>

          <div className="menu-div">
            <ul className="menu">
              {menuItems.map((item) => (
                <li key={item.label} className="menu-item">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="accounts-div">
            <div className="actions">
              <Link to={ROUTES.login}>
                <Button className="sign-in">Sign In</Button>
              </Link>
              <Link to={ROUTES.forBusiness}>
                <Button className="join-prof">Join as Professional</Button>
              </Link>
            </div>
          </div>

          <div className="mobile-toggle">
            <IconButton
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="mobile-drawer"
        PaperProps={{
          className: "drawer-paper",
        }}
      >
        <Box className="drawer-content">
          <Box className="drawer-header">
            <Link to={ROUTES.home} onClick={() => setMobileMenuOpen(false)}>
              <div className="logo">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    <path d="M20 3v4"></path>
                    <path d="M22 5h-4"></path>
                    <path d="M4 17v2"></path>
                    <path d="M5 18H3"></path>
                  </svg>
                </div>
                <h4>Beauty hub</h4>
              </div>
            </Link>
            <IconButton
              className="close-btn"
              onClick={() => setMobileMenuOpen(false)}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <ul className="mobile-menu">
            {menuItems.map((item) => (
              <li key={item.label} className="mobile-menu-item">
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Box className="mobile-actions">
            <Link
              to={ROUTES.login}
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: "100%" }}
            >
              <Button className="sign-in-mobile">Sign In</Button>
            </Link>
            <Link
              to={ROUTES.becomeProvider}
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: "100%" }}
            >
              <Button className="join-prof-mobile">Join as Professional</Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </header>
  );
}

export default Header;