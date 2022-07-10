import React from 'react';
import {Box, Button, VStack, Text, ScrollView} from 'native-base';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import Appointment from '../components/Appointment';

const Home = props => {
  const user = useSelector(state => state.user.user);

  return (
    <VStack space={4} p={4}>
      <Header />
      <Box>
        <Button>Reserve an Appointment</Button>
      </Box>
      <Text fontSize="2xl" fontWeight="black">
        Upcoming Appointments
      </Text>
      <ScrollView>
        <VStack space={4} pb={48}>
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Home;
