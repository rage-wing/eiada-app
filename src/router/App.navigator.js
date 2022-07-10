import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../views/Splash';
import Login from '../views/Login';
import MainNavigator from './Main.navigator';

const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Splash" component={Splash} />
      <Screen name="Login" component={Login} />
      <Screen name="Main" component={MainNavigator} />
    </Navigator>
  );
};

export default AppNavigator;
