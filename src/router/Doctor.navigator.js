import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tabbar from './components/Tabbar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Home from '../views/Doctor/Home';
import Images from '../views/Doctor/Images';
import Articles from '../views/Doctor/Articles';
import Article from '../views/Article';
import EditArticle from '../views/Doctor/EditArticle';

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const ArticlesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="Articles" component={Articles} />
      <Tabs.Screen name="Article" component={Article} />
      <Tabs.Screen name="EditArticle" component={EditArticle} />
    </Stack.Navigator>
  );
};

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
      <Tabs.Screen name="_Articles" component={ArticlesStack} />
    </Tabs.Navigator>
  );
};

export default DoctorNavigator;
