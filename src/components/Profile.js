import {Box, HStack, Image, Text} from 'native-base';
import React from 'react';
import strMax from '../utils/strMax';

const Profile = ({photo, name, sub}) => {
  return (
    <HStack space={2} alignItems="center">
      <Image source={{uri: photo}} w={20} h={20} rounded={6} alt="pro" />
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          {strMax(name, 15)}
        </Text>
        <Text>{sub}</Text>
      </Box>
    </HStack>
  );
};

export default Profile;
