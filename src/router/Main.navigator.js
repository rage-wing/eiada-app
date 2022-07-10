import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tabbar from './components/Tabbar';
import Drawer from './components/Drawer';

import Home from '../views/Home';

const Tabs = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Tabbar {...props} />}>
      <Tabs.Screen name="Home" component={Home} />
    </Tabs.Navigator>
  );
};

const {Navigator, Screen} = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerStyle={{width: 300}}
      overlayColor="#1F2430"
      drawerContent={props => <Drawer {...props} />}>
      <Screen name="Bottom Navigator" component={TabMenu} />
    </Navigator>
  );
};

export default MainNavigator;
