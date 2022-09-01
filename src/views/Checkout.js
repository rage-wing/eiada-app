import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';

const Checkout = props => {
  const appointment = useSelector(state => state.appointment.appointment);
  const navigation = useNavigation();

  const checkout = () => {
    navigation.navigate('Payment');
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Image
        mb={-24}
        zIndex={1}
        mx="auto"
        width={200}
        height={200}
        resizeMode="contain"
        source={require('../assets/logo.png')}
        alt="DR.Ahmed Dabour"
      />
      <Box bg="gray.100" height="full" pt={10} px={4}>
        <Text textAlign="center">Total Payout</Text>
        <Text fontSize={48} fontWeight="black" textAlign="center">
          152.29 USD
        </Text>
        <Box bg="white" mx={4} p={2}>
          <Text color="primary.500" textAlign="center">
            in person reservation with doctor Ahmed dabour
          </Text>
        </Box>
        <Box my={4}>
          <Text textAlign="center">Details</Text>
          <HStack space={2} alignItems="center">
            <Text textAlign="center" color="gray.500">
              child name
            </Text>
            <Text textAlign="center" fontSize={24} color="primary.500">
              {appointment?.data?.childName}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Text textAlign="center" color="gray.500">
              Phone Number
            </Text>
            <Text textAlign="center" fontSize={24} color="primary.500">
              {appointment?.data?.phone}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Text textAlign="center" color="gray.500">
              child birthdate
            </Text>
            <Text textAlign="center" fontSize={24} color="primary.500">
              {moment(appointment?.data?.childBirthDate).format('MMM DD, YYYY')}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Text textAlign="center" color="gray.500">
              child gender
            </Text>
            <Text textAlign="center" fontSize={24} color="primary.500">
              {appointment?.data?.childGender}
            </Text>
          </HStack>
          <Button onPress={checkout}>Checkout</Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default Checkout;
