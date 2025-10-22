import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoleRedirector from "../RoleRedirector/RoleRedirector";
import { ROUTES } from "../../routes";

function SocialLoginRedirect() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const parsedUser = JSON.parse(user);

    if (token && parsedUser) {
      login(parsedUser, token);
      setUserData(parsedUser);
    } else {
      navigate(ROUTES.loginSignup);
    }
  }, [searchParams, navigate, login]);

  if (userData) {
    return <RoleRedirector user={userData} />;
  }

  return <p>Processing login...</p>;
}

export default SocialLoginRedirect;
