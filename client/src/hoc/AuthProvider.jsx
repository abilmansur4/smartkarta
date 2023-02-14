import { useState, createContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   axios.get("http://localhost:3001/login").then((response) => {
  //     // console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setUser(response.data.user[0].username);
  //       // navigate("/", { replace: true });
  //       // auth.login(username);
  //       // console.log(response);
  //     }
  //   });
  // });

  const login = (user, password) => {
    axios
      .post("http://localhost:3001/login", {
        username: user,
        password: password,
      })
      .then((response) => {
        if (response.data[0]) {
          localStorage.setItem("user", response.data[0].username);
          setUser(localStorage.getItem("user"));
          navigate("/", { replace: true });
        }
      });
  };

  const logout = (cb) => {
    axios.get("http://localhost:3001/logout").then((response) => {
      console.log(response.data);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/", { replace: true });
    });
    cb();
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
