import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, userReducer } from './Reducers/userReducer';
import { converReducer, messageReducer } from './Reducers/converReducer';
import { msgReducer } from './Reducers/messageReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  conversations : converReducer,
  message : messageReducer,
  msg : msgReducer
});

const store = configureStore({
  reducer: rootReducer
})


export { store };
