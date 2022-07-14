import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointment: null,
};

export const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointmentProp: (state, action) => {
      state.appointment = {...state.appointment, ...action.payload};
    },
  },
});

// setters
export const {setAppointmentProp} = appointment.actions;

export default appointment.reducer;
