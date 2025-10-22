import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackBarContext";
import { Helmet } from "react-helmet-async";

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
      <Box
        display="flex"
        sx={{ height: "100vh", overflow: "hidden", background: "#FFF8F0" }}
      >
        <Box
          className="login-signup-div"
          sx={{ width: "55%", padding: "40px" }}
        >
          <div className="back-div">
            <button onClick={handleClick}>
              <ArrowBackIcon />
            </button>
          </div>
          <Box
            className="buttons"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="50px"
            sx={{ marginTop: "50px" }}
          >
            <Typography variant="h4">
              <b>Log in Or Sign up</b>
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="30px"
              className="login-signup-sub-div"
              sx={{ width: "55%" }}
            >
              <Link
                to={
                  redirectTo
                    ? `${ROUTES.customerLogin}?redirectTo=${encodeURIComponent(
                        redirectTo
                      )}`
                    : ROUTES.customerLogin
                }
              >
                <Box
                  className="loginSignupButton"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column" gap="15px">
                    <p
                      style={{
                        color: "#333333",
                        fontSize: "18px",
                        margin: "0",
                      }}
                    >
                      BeautyTrafic For Customers
                    </p>
                    <p
                      style={{
                        color: "#33333378",
                        fontSize: "18px",
                        margin: "0",
                      }}
                    >
                      Book Salons and spas near you
                    </p>
                  </Box>
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      viewBox="0 0 33 33"
                      fill="none"
                    >
                      <path
                        d="M4.73922 16.311L28.8787 16.311M28.8787 16.311L17.4795 27.7102M28.8787 16.311L17.4795 4.91186"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </Box>
              </Link>
              <Link
                to={
                  redirectTo
                    ? `${ROUTES.ownerLogin}?redirectTo=${encodeURIComponent(
                        redirectTo
                      )}`
                    : ROUTES.ownerLogin
                }
              >
                <Box
                  className="loginSignupButton"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column" gap="15px">
                    <p
                      style={{
                        color: "#333333",
                        fontSize: "18px",
                        margin: "0",
                      }}
                    >
                      BeautyTrafic For Professionals
                    </p>
                    <p
                      style={{
                        color: "#33333378",
                        fontSize: "18px",
                        margin: "0",
                      }}
                    >
                      Manage and grow your business
                    </p>
                  </Box>
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      viewBox="0 0 33 33"
                      fill="none"
                    >
                      <path
                        d="M4.73922 16.311L28.8787 16.311M28.8787 16.311L17.4795 27.7102M28.8787 16.311L17.4795 4.91186"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box className="banner_img" sx={{ width: "45%" }}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/login-signup-page-img.png`}
            alt="Banner Img"
            style={{ width: "100%" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default LoginSignupPage;
