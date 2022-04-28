import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// User input action setting = state
// this state can get anywhere component
const initialState = {
  // user: null,
  user: {
    _id: '62657f2c2101d4a8b995e88c',
    username: 'Nick',
    email: 'nick@gmail.com',
    password: '123454',
    profilePicture: '/person/1.jpeg',
    coverPicture: '',
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: false,
  error: false,
};

// AuthContext manage state at Global
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState); // state is = state' from README.md, dispatch can work using AuthAction.js
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children} {/* <App /> at index.js */}
    </AuthContext.Provider>
  );
};
