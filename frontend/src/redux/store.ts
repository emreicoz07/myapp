import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentReducer, // Randevu işlemleri için reducer ekleniyor
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
