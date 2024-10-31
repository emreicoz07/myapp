import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Randevu ekleme asenkron thunk fonksiyonu
export const addAppointmentAsync = createAsyncThunk(
  'appointments/addAppointment',
  async (newAppointment: {
    service: string;
    date: string;
    time: string;
    customerName: string;
    email: string;
    phone: string;
  }) => {
    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || 'Failed to add appointment');
    }

    return newAppointment;
  },
);

interface AppointmentState {
  appointments: any[];
  loading: boolean;
  success: boolean;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  success: false,
};

// appointmentSlice tanımlıyoruz
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAppointmentAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addAppointmentAsync.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(addAppointmentAsync.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export const selectLoading = (state: RootState) => state.appointments.loading;
export const selectSuccess = (state: RootState) => state.appointments.success;

export default appointmentSlice.reducer;
