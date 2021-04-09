import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import AlertMessage from "../layout/AlertMessage";

function RegisterForm(props) {
  const { registerUser } = useContext(AuthContext);

  //local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password, confirmpassword } = registerForm;
  const onchangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      setAlert({ type: "danger", message: "passworn do not match" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            require
            value={username}
            onChange={onchangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            require
            value={password}
            onChange={onchangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="confirmPassword"
            name="confirmpassword"
            require
            value={confirmpassword}
            onChange={onchangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          submit
        </Button>
      </Form>
      <p>
        Already have an account
        <Link to="/login">
          <Button variant="info" size="sm">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
