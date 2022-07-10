import React, {useState, useEffect} from 'react';
import Splash from '../views/Splash';
import Login from '../views/Login';
import MainNavigator from './Main.navigator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = userInfo => {
    const userData = JSON.parse(JSON.stringify(userInfo, 0, 2));

    dispatch(setUser(userData));
    if (loading) {
      setLoading(false);
    }
  };

  const googleAuthConfig = () => {
    GoogleSignin.configure({
      webClientId:
        '922911745683-lumem7dotmaed6m67obbmbshc5qvhs07.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
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
