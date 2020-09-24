import React, { useCallback, useReducer, useEffect } from "react";
import { hydrate, persist } from "./../../../utils/persist";
import axios from "axios";
const initialState = {
  authenticating: true,
  isLoggedIn: false,
  isCreated: false,
  msg: "",
};
export const Store = React.createContext(initialState);
export function createAction(type) {
  function actionCreator(payload) {
    return { type, payload };
  }

  actionCreator.toString = () => `${type}`;

  actionCreator.type = type;

  return actionCreator;
}
const actions = {
  setAuthenticationState: createAction("SET_AUTHENTICATION"),
  resetUserInfo: createAction("RESET_USER_INFO"),
  createUser: createAction("CRAETE_USER"),
  response: createAction("GET_RES"),
};
export function createReducer(actionsMap) {
  return function reducer(state, action) {
    const caseReducer = actionsMap[action.type];

    return caseReducer ? caseReducer(state, action) : state;
  };
}
const AuthReducer = createReducer({
  [actions.setAuthenticationState.toString()]: (state, { payload }) => {
    return {
      ...state,
      authenticating: false,
      ...payload,
    };
  },

  [actions.resetUserInfo.toString()]: () => {
    return {
      ...initialState,
      authenticating: false,
    };
  },
  [actions.createUser.toString()]: () => {
    return {
      ...initialState,
      authenticating: false,
      isCreated: true,
    };
  },
  [actions.response.toString()]: (state, { payload: msg }) => {
    return {
      ...initialState,
      authenticating: false,
      msg,
    };
  },
});

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const logout = useCallback(() => {
    localStorage.removeItem("user-data");
    localStorage.removeItem("x-auth-token");
    dispatch(actions.resetUserInfo());
  }, []);

  const setUserInfo = useCallback(
    (token, userData) => {
      if (userData && token) {
        persist("user-data", userData, "localStorage");
        persist("x-auth-token", token, "localStorage");
        const userInfo = {
          token,
          isLoggedIn: true,
          user: {
            ...userData,
          },
        };
        dispatch(actions.setAuthenticationState(userInfo));
      } else {
        logout();
      }
    },
    [logout]
  );
  const login = useCallback(
    async (value, history) => {
      try {
        const { data } = await axios.post(`/auth/login`, {
          method: "post",
          ...value,
        });
        if (data && data.name && data.token) {
          setUserInfo(data.token, data);
          history.push("/profile");
        } else {
          logout();
        }
      } catch (error) {
        console.log("No Data Found", error);
        dispatch(actions.response(error.response.data.message));
      }
    },
    [logout, setUserInfo]
  );

  const signup = useCallback(
    async (value, history) => {
      try {
        const { data } = await axios.post(`/auth/signup`, {
          method: "post",
          ...value,
        });
        if (data && data.name) {
          dispatch(actions.createUser);
        } else {
          logout();
        }
      } catch (error) {
        dispatch(actions.response(error.response.data.message));
      }
    },
    [logout]
  );

  useEffect(() => {
    const user = hydrate("user-data", "localStorage");
    const token = hydrate("x-auth-token", "localStorage");
    setUserInfo(token, user);
  }, [setUserInfo, logout]);
  return (
    <Store.Provider value={{ state, dispatch, login, logout, signup }}>
      {props.children}
    </Store.Provider>
  );
};
