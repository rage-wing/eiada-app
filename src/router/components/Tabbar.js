import {HStack, Icon, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Tab = ({icon, name, to, currentTab}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(to || name);
  };

  return (
    <Pressable onPress={onPress} style={{flex: 1}}>
      <VStack alignItems="center">
        {/* <Icon
          color={currentTab === name ? 'primary.500' : 'gray.400'}
          as={FontAwesome5}
          name={icon}
          size={6}
        /> */}
        <Text color={currentTab === name ? 'primary.500' : 'gray.400'}>
          {name}
        </Text>
      </VStack>
    </Pressable>
  );
};

const Tabbar = ({state: {routeNames, index}, ...props}) => {
  const currentTab = routeNames[index];
  return (
    <HStack justifyContent="center" space={4} p={2} bgColor="gray.100">
      <Tab icon="home" name="Home" currentTab={currentTab} />
    </HStack>
  );
};

export default Tabbar;
