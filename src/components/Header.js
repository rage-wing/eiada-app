import React from 'react';
import {Avatar, Box, HStack, Pressable, Text, Icon} from 'native-base';
import {useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import strMax from '../utils/strMax';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Header = props => {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation();

  const navigate = to => {
    navigation.navigate(to);
  };

  const logout = async () => {
    await GoogleSignin.signOut();
    return auth().signOut();
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={2}>
        {user.role !== 'doctor' && (
          <Icon
            as={IonIcon}
            onPress={navigation.openDrawer}
            name="menu-outline"
            size={6}
            color="#000"
          />
        )}
        <Pressable onPress={() => navigate('Profile')}>
          <HStack space={2}>
            <Avatar
              size="lg"
              source={{
                uri: user.photoURL,
              }}
            />
            <Box>
              <Text fontSize={16}>welcome </Text>
              <Text fontSize={18} fontWeight="black">
                {strMax(user.displayName, 15)}
              </Text>
            </Box>
          </HStack>
        </Pressable>
      </HStack>
      {user.role === 'doctor' && (
        <Icon
          as={IonIcon}
          onPress={logout}
          name="exit-outline"
          size={6}
          color="danger.500"
        />
      )}
    </HStack>
  );
};

export default Header;
