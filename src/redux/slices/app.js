import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  alert: {
    title: '',
    body: '',
    confirmText: '',
    cancelText: 'cancel',
  },
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = {...state.alert, ...action.payload};
    },
  },
});

// setters
export const {setAlert} = app.actions;

export default app.reducer;
