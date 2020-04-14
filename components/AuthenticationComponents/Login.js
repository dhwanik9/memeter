import React from "react";

import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="login authentication">
      <i className="material-icons-outlined icon">
        account_circle
      </i>
      <h1 className="title">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;