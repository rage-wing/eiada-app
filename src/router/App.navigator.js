import React, {useState, useEffect} from 'react';
import Splash from '../views/Splash';
import Login from '../views/Login';
import MainNavigator from './Main.navigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';
import keys from '../config/keys.json';
import userService from '../services/user';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const googleAuthConfig = () => {
    GoogleSignin.configure({
      webClientId: keys.google.webClientId,
      scopes: ['profile', 'email'],
    });
  };

  const onAuthStateChanged = async userInfo => {
    const userData = JSON.parse(JSON.stringify(userInfo, 0, 2));
    if (userData) {
      const res = await userService.login(userData);
      dispatch(setUser(res.payload));
    } else {
      dispatch(setUser(null));
    }
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    googleAuthConfig();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Splash />;
  }
  if (!user) {
    return <Login />;
  }

  return <MainNavigator />;
};

export default AppNavigator;
