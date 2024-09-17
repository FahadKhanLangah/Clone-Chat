import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer, userReducer } from './Reducers/userReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  users : userReducer,
})
const store = configureStore({ reducer: rootReducers});


export default store;