import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

Auth.propTypes = {};

function Auth({ authRoute }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (authLoading)
    <div className="d-flex justify-content-center mt-2">
      <Spinner animation="border" variant="info" />
    </div>;
  else if (isAuthenticated) return <Redirect to="/dashboard" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Kepp track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
