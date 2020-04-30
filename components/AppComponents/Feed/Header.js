import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ result }) => {
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
        Memeter <sup>2020.4.1</sup>
      </h1>
      <div className="link-buttons">
        <NavLink
          to={ `/profile/user/${ result.uid }` }
          className="link-button">
          {
            result.photoURL ? (
              <img src={ result.photoURL } alt={ result.displayName } />
            ) : (
              <i className="material-icons-outlined">
                account_circle
              </i>
            )
          }
          { result.displayName }
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

const mapStateToProps = (state) => ({
  result: state.user.result,
});

export default connect(mapStateToProps)(Header);