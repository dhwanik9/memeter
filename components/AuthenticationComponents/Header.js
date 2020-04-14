import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return(
    <div className="header">
      <h1 className="header-title">
        Memeter <sup>BETA</sup>
      </h1>
      <div className="link-buttons">
        <NavLink
          to="/"
          className="home-link link-button">
          <i className="material-icons-outlined">
            home
          </i>
          Home
        </NavLink>
        < NavLink
          to="/login"
          className="login-link link-button"
          activeStyle={{
            color: "#01579b"
          }}>
          <i className="material-icons-outlined">
            account_circle
          </i>
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="register-link link-button"
          activeStyle={{
            color: "#01579b"
          }}>
          <i className="material-icons-outlined">
            assignment_ind
          </i>
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Header;