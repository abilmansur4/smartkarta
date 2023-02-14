import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Input, Button, Container } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../hook/useAuth";

const LoginPage = (props) => {
  // const [usernameReg, setUsernameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;

  // const register = () => {
  //   axios
  //     .post("http://localhost:3001/register", {
  //       username: usernameReg,
  //       password: passwordReg,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    auth.login(username, password);
    // console.log(username);
  };

  // const handleLogin1 = () => {
  //   console.log("clicked");
  //   auth.login(username, () => {
  //     navigate(fromPage, { replace: true });
  //   });
  // };

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      // console.log(response);
      if (response.data.loggedIn === true) {
        localStorage.setItem("user", response.data.user[0].username);
        // console.log(response);
      }
    });
  }, []);

  return (
    // <div>
    <Box
      boxShadow="0px 5px 10px 3px rgba(34, 60, 80, 0.2);"
      // maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      ml="auto"
      mr="auto"
      mt="200px"
    >
      {/* <div className="registration_1">
          <h1>Registration</h1>
          <label>Username</label>
          <Input
            size="md"
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label>Password</label>
          <Input
            size="md"
            type="text"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <button onClick={register}>Register</button>
        </div> */}
      <div className="login_1">
        {/* <h1>Авторизация</h1> */}
        {/* <label>Username</label> */}
        <Input
          size="md"
          type="text"
          placeholder="Имя пользователя"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {/* <label>Password</label> */}
        <Input
          size="md"
          type="password"
          placeholder="Пароль"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button colorScheme="blue" onClick={handleLogin}>
          Войти
        </Button>
      </div>
    </Box>

    // </div>
  );
};

export { LoginPage };
