import axios from "axios"
import { CREATE_CONVERSATION_FAIL, CREATE_CONVERSATION_REQ, CREATE_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL, GET_CONVERSATION_REQ, GET_CONVERSATION_SUCCESS, GET_MESSAGE_FAIL, GET_MESSAGE_REQ, GET_MESSAGE_SUCCESS, SENT_MESSAGE_FAIL, SENT_MESSAGE_REQ, SENT_MESSAGE_SUCCESS } from "../Constants/converConstant"


export const getConversation = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONVERSATION_REQ })
    const { data } = await axios.get('/api/v1/conversation/get');
    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const createConversation = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONVERSATION_REQ })
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post('/api/v1/conversation/create', formData, config);
    dispatch({
      type: CREATE_CONVERSATION_SUCCESS,
      payload: data.conversation
    })
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const getMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGE_REQ })
    const { data } = await axios.get(`/api/v1/message/get/${id}`);
    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_MESSAGE_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const sendMessage = (id, formData) => async (dispatch) => {
  console.log(formData);
  try {
    dispatch({ type: SENT_MESSAGE_REQ })
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post(`/api/v1/message/send/${id}`, formData, config);
    console.log("send", data)
    dispatch({
      type: SENT_MESSAGE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SENT_MESSAGE_FAIL,
      payload: error.response || error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}