import React, { lazy } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import AppRoute from "./components/AppRoute";
import IndexRedirect from "./redirect";

const Login = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "./../AuthGate/Login/Login")
);

const Signup = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "../AuthGate/Signup/Signup")
);

const Profile = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "./../Profile/Profile")
);

export const UnauthenticatedRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute path="/login" as={Login} />
        <AppRoute path="/signup" as={Signup} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export const AuthenticatedRoutes = () => (
  <BrowserRouter>
    <Switch>
      <AppRoute path="/profile" as={Profile} />
      <AppRoute path="*" as={IndexRedirect} />
    </Switch>
  </BrowserRouter>
);
