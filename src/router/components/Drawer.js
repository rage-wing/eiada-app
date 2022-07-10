import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import {useDispatch, useSelector} from 'react-redux';
// import {setAccessToken, setUser} from '../redux/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Avatar,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

const Drawer = ({state: {routeNames, index}, ...props}) => {
  // const user = useSelector(state => state.user.user);
  // const dispatch = useDispatch();

  console.log('logout');
  const logout = async () => {
    // await AsyncStorage.removeItem('accessToken', null);
    // dispatch(setUser(null));
    // dispatch(setAccessToken(null));
  };

  return (
    <VStack flex={1}>
      <HStack bgColor="gray.200" space={2} p={4}>
        {/* <Avatar
          size="lg"
          source={{
            uri: user.picture,
          }}
        />
        <Box>
          <Text fontSize={16}>welcome</Text>
          <Text fontSize={18} fontWeight="black">
            {user.name.slice(0, 15)}
            {user.name.length > 15 ? '...' : ''}
          </Text>
        </Box> */}
      </HStack>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        {/* <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate('Profile')}
        /> */}
      </DrawerContentScrollView>
      <DrawerItem label="Logout" onPress={logout} />
    </VStack>
  );
};

export default Drawer;
