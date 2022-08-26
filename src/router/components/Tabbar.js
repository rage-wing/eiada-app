import {HStack, Pressable, Icon, VStack} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Tab = ({icon, name, to, currentTab}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(to || name);
  };

  const isActive = currentTab === name;

  return (
    <Pressable onPress={onPress} style={{flex: 1}}>
      <VStack
        p={2}
        rounded={6}
        alignItems="center"
        bgColor={isActive ? 'secondary.400' : 'gray.100'}>
        <Icon
          color={isActive ? '#000' : 'gray.400'}
          as={IonIcon}
          name={icon}
          size={6}
        />
        {/* {isActive && <Text color="#000">{name}</Text>} */}
      </VStack>
    </Pressable>
  );
};

const Tabbar = ({state: {routeNames, index}, ...props}) => {
  const currentTab = routeNames[index];
  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      bgColor="gray.100"
      rounded={6}
      space={4}
      p={2}
      m={2}>
      <Tab icon="home" name="_Home" currentTab={currentTab} />
      <Tab icon="images" name="Gallery" currentTab={currentTab} />
      <Tab icon="library" name="_Articles" currentTab={currentTab} />
      <Tab icon="chatbubble" name="ContactUs" currentTab={currentTab} />
    </HStack>
  );
};

export default Tabbar;
