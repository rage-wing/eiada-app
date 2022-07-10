import React from 'react';
import {Avatar, Box, HStack, Pressable, Text, Icon} from 'native-base';
import {useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation();

  const navigate = to => {
    navigation.navigate(to);
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={2}>
        <Icon
          as={IonIcon}
          onPress={navigation.openDrawer}
          name="menu-outline"
          size={6}
          color="#000"
        />
        <Pressable onPress={() => navigate('Profile')}>
          <HStack space={2}>
            <Avatar
              size="lg"
              source={{
                uri: user.photoURL,
              }}
            />
            <Box>
              <Text fontSize={16}>welcome</Text>
              <Text fontSize={18} fontWeight="black">
                {user.displayName.slice(0, 15)}
                {user.displayName.length > 15 ? '...' : ''}
              </Text>
            </Box>
          </HStack>
        </Pressable>
      </HStack>
    </HStack>
  );
};

export default Header;
