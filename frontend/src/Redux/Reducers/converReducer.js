import { GET_CONVERSATION_FAIL, GET_CONVERSATION_REQ, GET_CONVERSATION_SUCCESS } from "../Constants/converConstant";

const initialState = {
  loading: false,
  conversations: [],
  error: null
}
export const converReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATION_REQ:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: action.payload.conversations,
        error: null
      }
    case GET_CONVERSATION_FAIL:
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