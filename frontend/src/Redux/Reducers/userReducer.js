import { CHAT_USER_FAIL, CHAT_USER_REQ, CHAT_USER_SUCCESS, CLEAR_ERRORS, LOGIN_USER_DETAIL_FAIL, LOGIN_USER_DETAIL_REQ, LOGIN_USER_DETAIL_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQ, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQ, LOGOUT_USER_SUCCESS, OTHER_USER_FAIL, OTHER_USER_REQ, OTHER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQ, REGISTER_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQ, UPDATE_USER_SUCCESS } from "../Constants/userConstant";

const authState = {
  isAuth: false,
  user: JSON.parse(localStorage.getItem('user')),
  error: null,
  loading: false,
  onlineUsers: []
}
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case "SET_ONLINE_USER":
      return {
        ...state,
        onlineUsers: [...state.onlineUsers, action.payload],
      };
    case "REMOVE_ONLINE_USER":
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter((id) => id !== action.payload),
      };
    case REGISTER_USER_REQ:
    case LOGOUT_USER_REQ:
    case LOGIN_USER_REQ:
    case LOGIN_USER_DETAIL_REQ:
    case UPDATE_USER_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('isAuth', action.payload.success);
      return {
        ...state,
        loading: false,
        isAuth: action.payload.success,
        error: null,
        user: action.payload.user,
        message: action.payload.message,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      }
    case LOGIN_USER_DETAIL_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
      }
    case LOGOUT_USER_SUCCESS:
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
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
    case LOGIN_USER_DETAIL_FAIL:
      if (action.payload === "Session expired. Please log in again.") {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('users');
      }
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      }
    case LOGOUT_USER_FAIL:
    case UPDATE_USER_FAIL:
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
  users: JSON.parse(localStorage.getItem('users')) || [],
  error: null,
  loading: false,
  chatUsers: [],
  onlineUsers: []
}
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case OTHER_USER_REQ:
    case CHAT_USER_REQ:
      return {
        ...state,
        loading: true
      }
    case 'SET_ONLINE_USERS':
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case OTHER_USER_SUCCESS:
      if (action.payload.users) {
        localStorage.setItem('users', JSON.stringify(action.payload.users));
      }
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        error: null
      }
    case CHAT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        chatUsers: action.payload.participants,
        error: null
      }
    case OTHER_USER_FAIL:
    case CHAT_USER_FAIL:
      if (action.payload === "Session expired. Please log in again.") {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('users');
      }
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
        chatUsers: []
      }
    default:
      return { ...state }
  }
}