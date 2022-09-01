import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
import Checkout from '../views/Checkout';
import Payment from '../views/Payment';
import Offers from '../views/Offers';
import About from '../views/About';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
      <Tabs.Screen name="Checkout" component={Checkout} />
      <Tabs.Screen name="Payment" component={Payment} />
      <Tabs.Screen name="Offers" component={Offers} />
      <Tabs.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};
const ArticlesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Articles" component={Articles} />
      <Tabs.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
};

const TabMenu = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Tabbar {...props} />}>
      <Tabs.Screen name="_Home" component={HomeStack} />
      <Tabs.Screen name="Gallery" component={Gallery} />
      <Tabs.Screen name="ContactUs" component={ContactUs} />
      <Tabs.Screen name="_Articles" component={ArticlesStack} />
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
