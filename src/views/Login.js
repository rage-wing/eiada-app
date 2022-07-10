import {Box, Button, Center, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';

import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';

const Login = props => {
  const dispatch = useDispatch();

  const login = () => {
    dispatch(setUser({}));
    props.navigation.navigate('Main');
  };

  return (
    <Center flex={1}>
      <Center px={8} flex={1} bgColor="red.500">
        <Box w="1/2" h={24}>
          <Image
            flex={1}
            resizeMode="contain"
            source={require('../assets/logo.png')}
            alt="DR.Ahmed Dabour"
          />
        </Box>
        <HStack>
          <Text fontSize={24} fontWeight={900} color="secondary.400">
            DR.
          </Text>
          <Text fontSize={24} fontWeight={900} color="primary.500">
            Ahmed Dabour
          </Text>
        </HStack>
      </Center>

      <Box bgColor="red.300">
        <Button colorScheme="secondary" w="full" onPress={login}>
          <Text>Login</Text>
        </Button>
      </Box>
    </Center>
  );
};

export default Login;
