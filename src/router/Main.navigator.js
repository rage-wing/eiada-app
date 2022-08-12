import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tabbar from './components/Tabbar';
import Drawer from './components/Drawer';

// screens
import Home from '../views/Home';
import Appointment from '../views/Appointment';
import CreateAppointment from '../views/CreateAppointment';
import Gallery from '../views/Gallery';
import ContactUs from '../views/ContactUs';
import Articles from '../views/Articles';
import Article from '../views/Article';
import PaymentMethod from '../views/PaymentMethod';
import Payment from '../views/Payment';

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
      <Tabs.Screen name="Appointment" component={Appointment} />
      <Tabs.Screen name="CreateAppointment" component={CreateAppointment} />
      <Tabs.Screen name="Gallery" component={Gallery} />
      <Tabs.Screen name="ContactUs" component={ContactUs} />
      <Tabs.Screen name="Articles" component={Articles} />
      <Tabs.Screen name="Article" component={Article} />
      <Tabs.Screen name="PaymentMethod" component={PaymentMethod} />
      <Tabs.Screen name="Payment" component={Payment} />
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
