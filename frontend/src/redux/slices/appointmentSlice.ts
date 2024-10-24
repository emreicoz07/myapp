import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  service: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload); // Yeni randevu ekleniyor
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
