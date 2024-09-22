import { GET_LAST_MESSAGE_FAIL, GET_LAST_MESSAGE_REQ, GET_LAST_MESSAGE_SUCCESS, SET_LAST_MESSAGE_FAIL, SET_LAST_MESSAGE_REQ, SET_LAST_MESSAGE_SUCCESS } from "../Constants/converConstant";


const initialState = {
  loading: false,
  lastMessage: {}
}

export const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAST_MESSAGE_REQ:
    case GET_LAST_MESSAGE_REQ:
      return {
        ...state,
        loading: true,
      }
    case SET_LAST_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case GET_LAST_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastMessage: action.payload.lastMessage.message
      }
    case SET_LAST_MESSAGE_FAIL:
    case GET_LAST_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return { ...state };
  }
}