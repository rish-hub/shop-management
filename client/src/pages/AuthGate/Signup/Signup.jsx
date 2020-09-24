import React, { useCallback } from "react";
import SignupForm from "./component/SignupForm";
import { useHistory } from "react-router-dom";
import { Store } from "../context/authContext";

const Signup = () => {
  const { signup, state } = React.useContext(Store);
  const history = useHistory();
  const handleSingup = useCallback(
    async (creds) => {
      await signup(creds, history);
    },
    [history, signup]
  );
  return <SignupForm signup={handleSingup} error={state.msg} isCreated={state.isCreated}/>;
};

export default Signup;
