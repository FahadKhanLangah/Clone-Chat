import { CREATE_CONVERSATION_FAIL, CREATE_CONVERSATION_REQ, CREATE_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL, GET_CONVERSATION_REQ, GET_CONVERSATION_SUCCESS, GET_MESSAGE_FAIL, GET_MESSAGE_REQ, GET_MESSAGE_SUCCESS, SENT_MESSAGE_FAIL, SENT_MESSAGE_REQ, SENT_MESSAGE_SUCCESS } from "../Constants/converConstant";

const initialState = {
  loading: false,
  conversations: [],
  error: null,
  conversation: {},
  converId: JSON.parse(localStorage.getItem('conversationId'))
}
export const converReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION_REQ:
    case CREATE_CONVERSATION_REQ:
      return {
        ...state,
        loading: true,
        error: null,
        converId: null
      }
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: action.payload.conversations,
        error: null
      }
    case CREATE_CONVERSATION_SUCCESS:
      localStorage.setItem('conversationId', JSON.stringify(action.payload._id));
      return {
        ...state,
        loading: false,
        converId: action.payload._id,
        error: null
      }
    case GET_CONVERSATION_FAIL:
    case CREATE_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return {
        ...state
      };
  }
}
const messageState = {
  messages: [],
  loading: false,
  error: null,
  message : {}
}
export const messageReducer = (state = messageState, action) => {
  switch (action.type) {
    case GET_MESSAGE_REQ:
      case SENT_MESSAGE_REQ:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
        error: null
      }
      case SENT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success : action.payload.success,
        error: null
      }
    case GET_MESSAGE_FAIL:
      case SENT_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return {
        ...state
      };
  }
}