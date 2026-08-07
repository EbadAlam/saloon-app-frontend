import React from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackBarContext";
import { Helmet } from "react-helmet-async";
import "./login-signup.scss";

function LoginSignupPage() {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectToState = location.state?.redirectToState;

  const handleClick = () => {
    if (redirectToState == "home") {
      navigate(ROUTES.home);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES.home);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const error = searchParams.get("error");

  if (error && error == "role-mismatch") {
    showSnackbar(
      "This account is already registered with different role.",
      "error"
    );
    navigate(ROUTES.loginSignup, { replace: true });
  }

  return (
    <>
      <Helmet>
        <title>Beauty Traffic login page</title>
      </Helmet>

      <Box className="bt-auth">
        <button className="bt-auth__back" onClick={handleClick} aria-label="Go back">
          <ArrowBackIcon fontSize="small" />
        </button>

        <div className="bt-auth__content">
          <span className="bt-auth__eyebrow">Get started</span>
          <h1 className="bt-auth__title">
            Book it. <span>Or run it.</span>
          </h1>
          <p className="bt-auth__subtitle">Choose how you'll use BeautyTrafic</p>

          <div className="bt-auth__options">
            <Link
              className="bt-auth-card"
              to={
                redirectTo
                  ? `${ROUTES.customerLogin}?redirectTo=${encodeURIComponent(redirectTo)}`
                  : ROUTES.customerLogin
              }
            >
              <span className="bt-auth-card__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7.5-4.6-10-9.1C.4 8.4 2 4.8 5.6 4.1c2-.4 4 .5 6.4 3 2.4-2.5 4.4-3.4 6.4-3 3.6.7 5.2 4.3 3.6 7.8C19.5 16.4 12 21 12 21z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="bt-auth-card__main">
                <span className="bt-auth-card__title">For Customers</span>
                <span className="bt-auth-card__subtitle">Book salons and spas near you</span>
              </span>
              <span className="bt-auth-card__divider" aria-hidden="true" />
              <span className="bt-auth-card__stub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <Link
              className="bt-auth-card bt-auth-card--pro"
              to={
                redirectTo
                  ? `${ROUTES.ownerLogin}?redirectTo=${encodeURIComponent(redirectTo)}`
                  : ROUTES.ownerLogin
              }
            >
              <span className="bt-auth-card__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.3 7.6 20 18M20 6 8.3 16.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="bt-auth-card__main">
                <span className="bt-auth-card__title">For Professionals</span>
                <span className="bt-auth-card__subtitle">Manage and grow your business</span>
              </span>
              <span className="bt-auth-card__divider" aria-hidden="true" />
              <span className="bt-auth-card__stub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </Box>
    </>
  );
}

export default LoginSignupPage;