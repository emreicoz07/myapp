import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Reducer'ları birleştirmek için
import allReducer from './reducers/allReducer'; // Örnek bir reducer

//Tüm  reducer'ları birleştiriyoruz
const rootReducer = combineReducers({
  example : allReducer, //Bu Reducer Denemesi, Diğer reducer'ları buraya ekleyeceğiz.
});

const store = configureStore({
  reducer:rootReducer,
});

export default store;