import axios from "axios";
import { DELETE_MESSAGE_FAIL, DELETE_MESSAGE_REQ, DELETE_MESSAGE_SUCCESS, SET_LAST_MESSAGE_FAIL, SET_LAST_MESSAGE_REQ, SET_LAST_MESSAGE_SUCCESS, UPDATE_READ_MESSAGE_FAIL, UPDATE_READ_MESSAGE_REQ, UPDATE_READ_MESSAGE_SUCCESS } from "../Constants/converConstant"


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
export const deleteMessageNow = (mids) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MESSAGE_REQ })
    const { data } = await axios.post("/api/v1/message/delete/message", mids);
    dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: DELETE_MESSAGE_FAIL,
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
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}