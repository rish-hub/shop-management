import React from "react";
import { composeComponents } from "./utils/composedComponent";
import AuthGate from "./pages/auth/AuthGate";
import "./App.css";
import { StoreProvider } from "./pages/AuthGate/context/authContext";

const Provider = composeComponents( StoreProvider);

function App() {
  return (
    <Provider>
      <AuthGate />
    </Provider>
  );
}

export default App;
