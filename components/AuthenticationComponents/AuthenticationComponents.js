import React from "react";
import { Route, Switch } from 'react-router';

import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Home from "./Home";
import ResetPassword from "./ResetPassword";

const AuthenticationComponents = () => {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/resetPassword" component={ ResetPassword } />
      </Switch>
    </>
  );
};


export default AuthenticationComponents;