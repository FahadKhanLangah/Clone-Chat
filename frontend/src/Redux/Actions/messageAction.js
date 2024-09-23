import axios from "axios";
import { GET_LAST_MESSAGE_FAIL, GET_LAST_MESSAGE_REQ, GET_LAST_MESSAGE_SUCCESS, SET_LAST_MESSAGE_FAIL, SET_LAST_MESSAGE_REQ, SET_LAST_MESSAGE_SUCCESS, UPDATE_READ_MESSAGE_FAIL, UPDATE_READ_MESSAGE_REQ, UPDATE_READ_MESSAGE_SUCCESS } from "../Constants/converConstant"


export const setLastMsg = (lastMsgId, conversationId) => async (dispatch) => {
  try {
    dispatch({ type: SET_LAST_MESSAGE_REQ });
    const { data } = await axios.post("/api/v1/message/setLastMessage", { lastMsgId, conversationId });
    dispatch({
      type: SET_LAST_MESSAGE_SUCCESS,
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: SET_LAST_MESSAGE_FAIL,
      payload: error.message || error.response.data.error
    })
  }
}
export const getLastMsg = (conversationId) => async (dispatch) => {
  try {
    dispatch({ type: GET_LAST_MESSAGE_REQ })
    const { data } = await axios.post("/api/v1/message/getLastMessage", conversationId);
    dispatch({
      GET_LAST_MESSAGE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_LAST_MESSAGE_FAIL,
      payload: error.message || error.response.data.error
    })
  }
}

export const updateReadStatus = (conversationId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_READ_MESSAGE_REQ });
    const { data } = await axios.put(`/api/v1/message/updateMessage/${conversationId}`);
    dispatch({
      type: UPDATE_READ_MESSAGE_SUCCESS,
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: UPDATE_READ_MESSAGE_FAIL,
      payload: error.message || error.response.data.message
    })
  }
}