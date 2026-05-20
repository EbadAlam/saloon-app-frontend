import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let savedToken,savedUser;
      savedToken = localStorage.getItem('ACCESS_TOKEN');
      savedUser = localStorage.getItem('AUTH_USER');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('AUTH_USER', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('AUTH_USER');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${weekday}, ${month} ${day} ${year} at ${time}`;
  };
  const updateFavorites = (favourite_stores) => {
    let user
    user = JSON.parse(localStorage.getItem("AUTH_USER"));
    user = {
      ...user,
      favourite_stores: favourite_stores,
    };

    localStorage.setItem("AUTH_USER", JSON.stringify(user));
  }
  function getVisitorId() {
    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("visitor_id", visitorId);
    }

    return visitorId;
}
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading,formatDate,updateFavorites,getVisitorId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
