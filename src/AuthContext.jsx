import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "./axiosInstance";

const cookies = new Cookies();
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookies.get("token"); // Correct token key
      console.log(token);
      try {
        const response = await axios.get('/api/users/user');
        console.log("auth", response);
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Handle error, e.g., redirect to login page
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, []);

  const login = (token, user) => {
    console.log(token, user);
    setUser(user);
    cookies.remove("token");
    cookies.set("token", token, {
      path: "/",
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  };

  const logout = async () => {
    await cookies.remove("token", {
      path: "/",
      domain: window.location.hostname,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
