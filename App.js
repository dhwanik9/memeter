import React, { useEffect } from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { connect } from "react-redux";

import {checkingAuthState} from "./actions/userAction";
import AppComponents from "./components/AppComponents/AppComponent";
import AuthenticationComponents from "./components/AuthenticationComponents/AuthenticationComponents";
import ProgressIndicator from "./components/ProgressIndicator";

const App = ({ dispatch, result, loading, loggedIn }) => {

  useEffect(() => {
    dispatch(checkingAuthState());
  }, [dispatch]);

  const renderUI = () => {
    if(loading) return <ProgressIndicator />;
    else if(loggedIn) return (
      <AppComponents />
    );
    else return (
      <AuthenticationComponents />
    )
  };

  return(
    <Router>
      <div className="app">
        {
          renderUI()
        }
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
  loading: state.user.loading,
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(App);