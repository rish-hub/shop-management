import React from "react";
import ProfieView from "./component/View";
import { Store } from "./../AuthGate/context/authContext";

const Profile = () => {
  const { logout } = React.useContext(Store);

  return <ProfieView logout={logout} />;
};

export default Profile;
