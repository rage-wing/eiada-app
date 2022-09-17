import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tabbar from './components/Tabbar';

// screens
import Home from '../views/Doctor/Home';
import Images from '../views/Doctor/Images';

const Tabs = createBottomTabNavigator();

const DoctorNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Tabbar {...props} />}>
      <Tabs.Screen name="_Home" component={Home} />
      <Tabs.Screen name="Gallery" component={Images} />
      <Tabs.Screen name="ContactUs" component={Home} />
      <Tabs.Screen name="_Articles" component={Home} />
    </Tabs.Navigator>
  );
};

export default DoctorNavigator;
