import axios from 'axios';

export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axios.post('auth/login', user); // get API from backend routes/auth.js
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
