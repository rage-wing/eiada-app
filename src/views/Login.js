import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/user';

const Login = props => {
  const dispatch = useDispatch();

  const login = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <Center flex={1}>
      <Center>
        <Box w="full" h={32}>
          <Image
            flex={1}
            resizeMode="contain"
            source={require('../assets/logo.png')}
            alt="DR.Ahmed Dabour"
          />
        </Box>
        <HStack>
          <Text fontSize={32} fontWeight={900} color="secondary.400">
            DR.
          </Text>
          <Text fontSize={32} fontWeight={900} color="primary.500">
            Ahmed Dabour
          </Text>
        </HStack>
      </Center>
      <Box w="full">
        <VStack space={4} m={12}>
          <Pressable onPress={login}>
            <HStack
              alignItems="center"
              bgColor="secondary.500"
              space={3}
              p={1}
              rounded={6}>
              <Image
                size={10}
                resizeMode="contain"
                source={require('../assets/icons/google.png')}
                alt="google"
              />
              <Text color="white" fontSize={18} fontWeight="bold">
                Login with Google
              </Text>
            </HStack>
          </Pressable>
          <Pressable onPress={login}>
            <HStack
              alignItems="center"
              bgColor="primary.500"
              space={3}
              p={1}
              rounded={6}>
              <Image
                size={10}
                resizeMode="contain"
                source={require('../assets/icons/facebook.png')}
                alt="facebook"
              />
              <Text color="white" fontSize={18} fontWeight="bold">
                Login with Facebook
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
