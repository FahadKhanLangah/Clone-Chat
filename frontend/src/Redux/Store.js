import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './Reducers/userReducer';
'./Reducers/userReducer';

const rootReducers = combineReducers({
  auth: authReducer
})
const store = configureStore({ reducer: rootReducers});



export default store;