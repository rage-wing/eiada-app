import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// create axios instance
const api = axios.create({
  baseURL: 'http://192.168.1.8:5000',
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
