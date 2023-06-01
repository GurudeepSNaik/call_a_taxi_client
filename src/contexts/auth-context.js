import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import { url } from "../../constants";
import { baseAxios } from "./utils/base_axios";
import axios from "axios";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  LOADING_TRUE:"LOADING_TRUE",
  LOADING_FALSE:"LOADING_FALSE"
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.LOADING_TRUE]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [HANDLERS.LOADING_FALSE]: (state) => {
    return {
      ...state,
      isLoading: false,
    };
  },
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [users, setUsers] = useState({});
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem("token") ? true : false;
      console.log(isAuthenticated);
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Admin",
        email: "admin@demo.com",
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Admin",
      email: "admin@demo.com",
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const resp = await axios.post(`${url}/login`, { email, password });
      console.log(resp);
      if (resp.data.status === 200) {
        const data = resp?.data?.data;
        const user = {
          id: data?._id,
          avatar: "/assets/avatars/avatar-omar-darboe.png",
          name: data?.name,
          email: data?.email,
        };
        localStorage.setItem("token", data?.token);
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user,
        });
      }
    } catch (error) {
      signOut();
      if (error?.response?.status === 400) {
        throw new Error("Please check your email and password");
      } else {
        throw new Error(error.message);
      }
    }
    setLoading(false);
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const getUsers = async (page) => {
    setLoading(true);
    try {
      const res = await baseAxios.get(`/users?page=${page}`);
      setUsers(res?.data?.responseData);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        alert(error.message);
      }
    }
    setLoading(false)
  };

  const getProviders = async (page) => {
    setLoading(true)
    try {
      const res = await baseAxios.get(`/providers?page=${page}`);
      setProviders(res?.data?.responseData);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        alert(error.message);
      }
    }
    setLoading(false)
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        getUsers,
        getProviders,
        users,
        providers,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
