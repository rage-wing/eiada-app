import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import env from '../config/env.json';
import envLive from '../config/env.live.json';

// create axios instance
const api = axios.create({
  baseURL: envLive.API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {api, axios};
