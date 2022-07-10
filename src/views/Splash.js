import {Box, Center, HStack, Image, Text} from 'native-base';
import React, {useEffect} from 'react';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 200);
  }, [props.navigation]);

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
    </Center>
  );
};

export default Splash;
