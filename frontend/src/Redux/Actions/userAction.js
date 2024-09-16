import axios from 'axios';
import { CLEAR_ERRORS, LOGIN_USER_FAIL, LOGIN_USER_REQ, LOGIN_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQ, REGISTER_USER_SUCCESS } from '../Constants/userConstant';

export const LoginUserNow = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQ })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/v1/users/login', formData, config);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}
export const RegisterUserNow = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQ });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/v1/users/register', formData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
