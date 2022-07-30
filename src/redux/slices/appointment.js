import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointment: {
    date: new Date().getTime(),
    gender: 'male',
  },
};

export const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointmentProp: (state, action) => {
      state.appointment = {
        ...state.appointment,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

// setters
export const {setAppointmentProp} = appointment.actions;

export default appointment.reducer;
