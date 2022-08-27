import {Box, Center, HStack, Image, Spinner, Text} from 'native-base';
import React from 'react';

const Splash = props => {
  return (
    <Center px={8} flex={1}>
      <Box w="full" h={48}>
        <Image
          flex={1}
          resizeMode="contain"
          source={require('../assets/logo.png')}
          alt="DR.Ahmed Dabour"
        />
      </Box>
      <HStack>
        <Text fontSize={36} fontWeight={900} color="secondary.400">
          DR.
        </Text>
        <Text fontSize={36} fontWeight={900} color="primary.500">
          Ahmed Dabour
        </Text>
      </HStack>
      <Spinner />
    </Center>
  );
};

export default Splash;
