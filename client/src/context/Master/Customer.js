import React, { useCallback, useReducer, useEffect } from "react";
// import { hydrate, persist } from "./../../../utils/persist";
import axios from "axios";
const initialState = {
    customers: [],
    isLoading: false,
    customer: {},
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
    // setAuthenticationState: createAction("FETCH_CUSTOMERS"),
    // resetUserInfo: createAction("CREATE_CUSTOMER"),
    // createUser: createAction("SEARCH_CUSTOMERS"),
    // response: createAction("GET_RES"),
    fetchCustomerList: createAction("FETCH_CUSTOMERS"),
    createCustomer: createAction("CREATE_CUSTOMER"),
    fetchSearchResult: createAction("FETACH_SEARCH_RESULT"),
    res: createAction("GET_RES"),
};
export function createReducer(actionsMap) {
    return function reducer(state, action) {
        const caseReducer = actionsMap[action.type];

        return caseReducer ? caseReducer(state, action) : state;
    };
}
const AuthReducer = createReducer({
    [actions.fetchCustomerList.toString()]: (state, { payload }) => {
        return {
            ...state,
            isLoading: false,
            ...payload,
        };
    },
    // [actions.resetUserInfo.toString()]: () => {
    //     return {
    //         ...initialState,
    //         authenticating: false,
    //     };
    // },
    [actions.createCustomer.toString()]: () => {
        return {
            ...initialState,
            isLoading: false,
            isCreated: true,
        };
    },
    [actions.res.toString()]: (state, { payload: msg }) => {
        return {
            ...initialState,
            isLoading: false,
            msg,
        };
    },
});

export const CustomerProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const createCustomer = useCallback(async(value, history) => {
        try {
            const { data } = await axios.post(`/customer/create`, {
                method: "post",
                ...value,
            });
            console.log(data, 'datadata')
        } catch (err) { console.log(err) }
    })

    // const login = useCallback(
    //     async (value, history) => {
    //         try {
    //             const { data } = await axios.post(`/auth/login`, {
    //                 method: "post",
    //                 ...value,
    //             });
    //             if (data && data.name && data.token) {
    //                 setUserInfo(data.token, data);
    //                 history.push("/dashboard");
    //             } else {
    //                 logout();
    //                 dispatch(actions.response(""));
    //             }
    //         } catch (error) {
    //             console.log("No Data Found", error);
    //             dispatch(actions.response(""));
    //             dispatch(actions.response(error.response.data.message));
    //         }
    //     },
    //     [logout, setUserInfo]
    // );

    // const setUserInfo = useCallback(
    //     (token, userData) => {
    //         if (userData && token) {
    //             persist("user-data", userData, "localStorage");
    //             persist("x-auth-token", token, "localStorage");
    //             const userInfo = {
    //                 token,
    //                 isLoggedIn: true,
    //                 user: {
    //                     ...userData,
    //                 },
    //             };
    //             dispatch(actions.setAuthenticationState(userInfo));
    //         } else {
    //             logout();
    //         }
    //     },
    //     [logout]
    // );


    // const signup = useCallback(
    //     async (value, history) => {
    //         try {
    //             const { data } = await axios.post(`/auth/signup`, {
    //                 method: "post",
    //                 ...value,
    //             });
    //             if (data && data.name) {
    //                 dispatch(actions.createUser);
    //             } else {
    //                 logout();
    //             }
    //         } catch (error) {
    //             dispatch(actions.response(error.response.data.message));
    //         }
    //     },
    //     [logout]
    // );

    // useEffect(() => {
    //     const user = hydrate("user-data", "localStorage");
    //     const token = hydrate("x-auth-token", "localStorage");
    //     setUserInfo(token, user);
    // }, [setUserInfo, logout]);
    return (
        <Store.Provider value={{ createCustomer }}>
            {props.children}
        </Store.Provider>
    );
};
