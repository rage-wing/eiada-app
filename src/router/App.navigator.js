import React, {useState, useEffect, useCallback} from 'react';
import Splash from '../views/Splash';
import Login from '../views/Login';
import MainNavigator from './Main.navigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';
import keys from '../config/keys.json';
import userService from '../services/user';
import DoctorNavigator from './Doctor.navigator';

const AppNavigator = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const googleAuthConfig = () => {
    GoogleSignin.configure({
      webClientId: keys.google.webClientId,
      scopes: ['profile', 'email'],
    });
  };

  const onAuthStateChanged = useCallback(
    async userInfo => {
      const userData = JSON.parse(JSON.stringify(userInfo, 0, 2));
      if (userData) {
        try {
          setLoading(true);
          const res = await userService.login(userData);
          dispatch(setUser(res.payload));
          setLoading(false);
        } catch (error) {
          alert(error);
        }
      } else {
        dispatch(setUser(null));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    googleAuthConfig();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (loading) {
    return <Splash />;
  }
  if (!user) {
    return <Login />;
  }

  if (user.role === 'doctor') {
    return (
      <>
        <DoctorNavigator />
      </>
    );
  }

  return <MainNavigator />;
};

export default AppNavigator;
