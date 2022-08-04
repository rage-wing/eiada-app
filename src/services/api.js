import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// create axios instance
const api = axios.create({
  baseURL: 'https://eiada-dr-ahmed.herokuapp.com/api/',
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
