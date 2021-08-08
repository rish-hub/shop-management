import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../context/authContext";
import LoginPage from './../../../pages/login';
const Login = () => {
  const { login, state } = React.useContext(Store);
  const history = useHistory();

  const handleLogin = useCallback(
    async (creds) => {
      await login(creds, history);
    },
    [history, login]
  );
  // return <LoginForm login={handleLogin} error={state.msg} />;
  return <LoginPage login={handleLogin} error={state.msg} />;
};

export default Login;
