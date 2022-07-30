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
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import strMax from '../../utils/strMax';

const Drawer = ({state: {routeNames, index}, ...props}) => {
  const user = useSelector(state => state.user.user);

  const logout = async () => {
    await GoogleSignin.signOut();
    return auth().signOut();
  };

  return (
    <VStack flex={1}>
      <HStack bgColor="secondary.400" space={2} px={4} py={8}>
        <Avatar
          size="lg"
          source={{
            uri: user.photoURL,
          }}
        />
        <Box>
          <Text fontSize={16}>welcome</Text>
          <Text fontSize={18} fontWeight="black">
            {strMax(user.displayName, 15)}
          </Text>
        </Box>
      </HStack>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="Offers"
          onPress={() => props.navigation.navigate('Offers')}
        />
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="About Us"
          onPress={() => props.navigation.navigate('AboutUs')}
        />
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="Gallery"
          onPress={() => props.navigation.navigate('Gallery')}
        />
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="Articles"
          onPress={() => props.navigation.navigate('Articles')}
        />
        <DrawerItem
          labelStyle={styles.drawerLabel}
          label="Contact Us"
          onPress={() => props.navigation.navigate('ContactUs')}
        />
      </DrawerContentScrollView>
      <Box p={4}>
        <Button colorScheme="danger" m="auto" px={12} onPress={logout}>
          <Text color="white">Logout</Text>
        </Button>
      </Box>
    </VStack>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 18,
    color: '#000',
  },
});
