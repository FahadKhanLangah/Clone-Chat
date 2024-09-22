import axios from 'axios';
import { CHAT_USER_FAIL, CHAT_USER_REQ, CHAT_USER_SUCCESS, CLEAR_ERRORS, LOAD_USER_REQ, LOGIN_USER_DETAIL_FAIL, LOGIN_USER_DETAIL_REQ, LOGIN_USER_DETAIL_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQ, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, OTHER_USER_FAIL, OTHER_USER_REQ, OTHER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQ, REGISTER_USER_SUCCESS } from '../Constants/userConstant';

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
        'Content-Type': 'multi-part/form-data',
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

export const getLoginUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_DETAIL_REQ })
    const { data } = await axios.get("/api/v1/users/me");
    dispatch({
      type: LOGIN_USER_DETAIL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_DETAIL_FAIL,
      error: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const logoutUserNow = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQ });
    const { data } = await axios.get('/api/v1/users/logout');
    console.log(data)
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const getOtherUsers = () => async (dispatch) => {
  try {
    dispatch({ type: OTHER_USER_REQ });
    const { data } = await axios.get('/api/v1/users/other');
    dispatch({
      type: OTHER_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: OTHER_USER_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const getChatUsers = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_USER_REQ });
    const { data } = await axios.get(`/api/v1/conversation/detail/${id}`);
    console.log(data)
    dispatch({
      type: CHAT_USER_SUCCESS,
      payload: data.conversation
    })
  } catch (error) {
    dispatch({
      type: CHAT_USER_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const setOnlineUserNow = (onlineUsers) => (dispatch) => {
  dispatch({
    type: 'SET_ONLINE_USERS',
    payload: onlineUsers,
  });
};