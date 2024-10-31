import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

// Redux Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
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

export const { resetSuccess } = appointmentSlice.actions;

// Reselectörleri export edin
export const selectLoading = (state: { appointments: AppointmentState }) =>
  state.appointments.loading;
export const selectSuccess = (state: { appointments: AppointmentState }) =>
  state.appointments.success;

export default appointmentSlice.reducer;
