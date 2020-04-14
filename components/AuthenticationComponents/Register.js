import React from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="register authentication">
      <i className="material-icons-outlined icon">
        assignment_ind
      </i>
      <h1 className="title">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;