import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  const toggleTheme = () => {
    const app = document.getElementsByTagName("body")[0];
    if(!localStorage.getItem("theme")|| localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      app.classList.add("dark");
      app.classList.remove("light");
    } else {
      localStorage.setItem("theme", "light");
      app.classList.add("light");
      app.classList.remove("dark");
    }
  };

  return(
    <div className="header">
      <h1 className="header-title">
        Memeter <sup>2020.4</sup>
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
        <span
          className="dark-mode-toggle"
          onClick={ toggleTheme }>
          <i className="material-icons-outlined dark-mode-toggle">
            brightness_5
          </i>
        </span>
      </div>
    </div>
  );
};

export default Header;