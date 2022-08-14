import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Toast from '../components/elements/Toast';

const Login = props => {
  const toast = useToast();

  const showToast = (type, message) => {
    toast.show({
      render: () => <Toast type={type} message={message} />,
    });
  };

  const loginWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return loginWithCreds(googleCredential);
  };
  const loginWithFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return loginWithCreds(facebookCredential);
  };

  const loginWithCreds = async creds => {
    try {
      const res = await auth().signInWithCredential(creds);
      return res;
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const message = 'You have already signed up with a different provider';
        showToast('error', message);
      } else if (error.code === 'auth/user-disabled') {
        const message = 'Your account has been disabled';
        showToast('error', message);
      } else {
        showToast('error', error.code);
      }
    }
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
          <Pressable onPress={loginWithGoogle}>
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
          <Pressable onPress={loginWithFacebook}>
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
