import React from "react";
import { UnauthenticatedRoutes, AuthenticatedRoutes } from "./Routes";
import { AppWrapper } from "./../../templates/AppWrapper";
import { Store } from "./../AuthGate/context/authContext";

 
export default function AuthGate() {
  const {
    state: { isLoggedIn, authenticating },
  } = React.useContext(Store);

  if (authenticating) {
    return <>Loading</>;
  }
  if (isLoggedIn) {
    return <AuthenticatedRoutes />;
  }

  return (
    <AppWrapper>
      <UnauthenticatedRoutes />
    </AppWrapper>
  );
}