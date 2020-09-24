import React from "react";

import { Redirect } from "react-router-dom";
import { Store } from "./../AuthGate/context/authContext";

const IndexRedirect = () => {
  const { state } = React.useContext(Store);
  const route = {
    to: state.isLoggedIn ? "/profile" : "/login",
  };
console.log(state, 'statestatestate')
  return <Redirect to={route.to} />;
};

export default IndexRedirect;
