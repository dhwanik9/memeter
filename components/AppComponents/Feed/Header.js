import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ result }) => {
  return(
    <div className="header">
      <h1 className="header-title">
        Memeter <sup>BETA</sup>
      </h1>
      <div className="link-buttons">
        <NavLink
          to="/profile"
          className="home-link link-button">
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
});

export default connect(mapStateToProps)(Header);