import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointment: {},
};

export const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
    setAppointmentProp: (state, action) => {
      state.appointment = {
        ...state.appointment,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

// setters
export const {setAppointmentProp, setAppointment} = appointment.actions;

export default appointment.reducer;
