import {configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import appointment from './slices/appointment';
import app from './slices/app';

export const store = configureStore({
  reducer: {
    user,
    appointment,
    app,
  },
});
