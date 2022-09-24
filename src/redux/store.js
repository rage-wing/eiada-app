import {configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import appointment from './slices/appointment';

export const store = configureStore({
  reducer: {
    user,
    appointment,
  },
});
