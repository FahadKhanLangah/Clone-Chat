import { DELETE_MESSAGE_FAIL, DELETE_MESSAGE_REQ, DELETE_MESSAGE_SUCCESS, GET_LAST_MESSAGE_FAIL, GET_LAST_MESSAGE_REQ, GET_LAST_MESSAGE_SUCCESS, SET_LAST_MESSAGE_FAIL, SET_LAST_MESSAGE_REQ, SET_LAST_MESSAGE_SUCCESS, UPDATE_READ_MESSAGE_FAIL, UPDATE_READ_MESSAGE_REQ, UPDATE_READ_MESSAGE_SUCCESS } from "../Constants/converConstant";


const initialState = {
  loading: false,
  lastMessage: {},
  error : null
}

export const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAST_MESSAGE_REQ:
    case GET_LAST_MESSAGE_REQ:
    case UPDATE_READ_MESSAGE_REQ:
      case DELETE_MESSAGE_REQ:
      return {
        ...state,
        loading: true,
        error : null
      }
    case UPDATE_READ_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        error : null
      }
    case SET_LAST_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error : null
      }
      case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error : null,
        message : action.payload.message
      }
    case GET_LAST_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastMessage: action.payload.lastMessage.message,
        error : null
      }
    case SET_LAST_MESSAGE_FAIL:
    case GET_LAST_MESSAGE_FAIL:
      case UPDATE_READ_MESSAGE_FAIL:
        case DELETE_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return { ...state };
  }
}