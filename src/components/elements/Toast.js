import {Box, HStack, Icon, Progress, Text} from 'native-base';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Toast = props => {
  const {message, type} = props;
  const bg = `state.${type}`;

  const iconNames = {
    success: 'checkmark-circle',
    warning: 'alert-circle',
    error: 'close-circle',
    info: 'information-circle',
  };

  return (
    <Box bg={`${bg}.dark`} mx={12}>
      <HStack alignItems="center" space={2} px="2" py="1">
        <Icon as={IonIcon} name={iconNames[type]} color="white" size="lg" />
        <Text color="white" textAlign="center">
          {message}
        </Text>
      </HStack>
      <Progress
        value={100}
        size="xs"
        borderRadius="0"
        bg={`${bg}.dark`}
        _filledTrack={{
          borderRadius: '0',
          backgroundColor: `${bg}.light`,
        }}
      />
    </Box>
  );
};

export default Toast;
