import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

// setters
export const {setUser, setAccessToken} = user.actions;

export default user.reducer;
