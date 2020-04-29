import React, { useEffect } from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { connect } from "react-redux";

import {checkingAuthState} from "./actions/userAction";
import AppComponents from "./components/AppComponents/AppComponent";
import AuthenticationComponents from "./components/AuthenticationComponents/AuthenticationComponents";
import LoadingLogo from "./components/LoadingLogo";

const App = ({ dispatch, loading, loggedIn }) => {

  useEffect(() => {
    dispatch(checkingAuthState());
  }, [dispatch]);

  const renderUI = () => {
    if(loading) return <LoadingLogo />;
    else if(loggedIn) return (
      <AppComponents />
    );
    else return (
      <AuthenticationComponents />
    )
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";
    body.classList.toggle(theme)
  }, []);

  return(
    <Router>
      <div
        className="app">
        {
          renderUI()
        }
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(App);