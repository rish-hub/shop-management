import React, { lazy } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import AppRoute from "./components/AppRoute";
import IndexRedirect from "./redirect";
import Layout from "./../../components/Layout";

const Login = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "./../AuthGate/Login/Login")
);

const Signup = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "../AuthGate/Signup/Signup")
);

const Dashboard = lazy(() =>
  import(/* webpackChuckName: 'Error' */ "./../dashboard/Dashboard")
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
      <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/dashboard" />}
      />
      <AppRoute path="/app" component={Layout} />
      <AppRoute path="*" as={IndexRedirect} />
    </Switch>
  </BrowserRouter>
);
