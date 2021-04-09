import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import AlertMessage from "../layout/AlertMessage";

function LoginForm(props) {
  //context
  const { loginUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;
  const onchangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            require
            value={username}
            onChange={onchangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            require
            value={password}
            onChange={onchangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          submit
        </Button>
      </Form>
      <p>
        Dont have an account
        <Link to="/register">
          <Button variant="info" size="sm">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
