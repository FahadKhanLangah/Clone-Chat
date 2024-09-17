import { CLEAR_ERRORS, LOGIN_USER_FAIL, LOGIN_USER_REQ, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQ, LOGOUT_USER_SUCCESS, OTHER_USER_FAIL, OTHER_USER_REQ, OTHER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQ, REGISTER_USER_SUCCESS } from "../Constants/userConstant";

const authState = {
  isAuth: false,
  user: {},
  error: null,
  loading : false
}
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQ:
    case LOGOUT_USER_REQ:
    case LOGIN_USER_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: action.payload.success,
        error: null,
        user: action.payload.user,
        message: action.payload.message,
      }
    case LOGOUT_USER_SUCCESS:

      return {
        ...state,
        error: null,
        loading: false,
        user: {},
        message: action.payload.message,
        isAuth: false
      }
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: action.payload.success,
        user: null,
        error: action.payload,
      }
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: true,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state
  }
}
const userState = {
  users: [],
  error: null,
  loading: false
}
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case OTHER_USER_REQ:
      return {
        ...state,
        loading: true
      }
    case OTHER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        error : null
      }
    case OTHER_USER_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return { ...state }
  }
}