import axios from "axios"
import { GET_CONVERSATION_FAIL, GET_CONVERSATION_REQ, GET_CONVERSATION_SUCCESS } from "../Constants/converConstant"


export const getConversation = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONVERSATION_REQ })
    const { data } = await axios.get('/api/v1/conversation/get');
    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload : data
    })
  } catch (error) {
    dispatch({
      type : GET_CONVERSATION_FAIL,
      payload : error.response || error.response.data.message ?
      error.response.data.message : error.message
    })
  }
}