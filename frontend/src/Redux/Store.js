import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, userReducer } from './Reducers/userReducer';
import { converReducer, messageReducer } from './Reducers/converReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  conversations : converReducer,
  message : messageReducer
});

const store = configureStore({
  reducer: rootReducer
})


export { store };
