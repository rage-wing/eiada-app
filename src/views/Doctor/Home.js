import {Box, Center, Image, ScrollView, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Appointment from '../../components/doctor/Appointment';
import Header from '../../components/Header';
import doctor from '../../services/doctor';

const NoAppointments = () => (
  <Center my="auto" mt={12}>
    <Box w="full" h={200}>
      <Image
        source={require('../../assets/no_appointments.png')}
        flex={1}
        alt="no appointments"
      />
    </Box>
    <Text color="gray.400" fontSize="2xl" textAlign="center" fontWeight="bold">
      you haven't reserved any appointments yet
    </Text>
  </Center>
);

const Home = props => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);

  const getUpcomingAppointments = async () => {
    const appointments = await doctor.getUpcomingAppointments();
    setUpcomingAppointments(appointments.payload);
  };

  const getPendingAppointments = async () => {
    const appointments = await doctor.getPendingAppointments();
    setPendingAppointments(appointments.payload);
  };

  useEffect(() => {
    getUpcomingAppointments();
    getPendingAppointments();
  }, []);

  return (
    <VStack space={4} p={4}>
      <Header />
      <ScrollView>
        <VStack space={4} pb={40}>
          {!!upcomingAppointments.length && (
            <>
              <Text fontSize="2xl" fontWeight="black">
                Upcoming Appointments
              </Text>
              {upcomingAppointments.map(appointment => (
                <Appointment key={appointment._id} {...appointment} />
              ))}
            </>
          )}
          {!!pendingAppointments.length && (
            <>
              <Text fontSize="2xl" fontWeight="black">
                Pending Appointments
              </Text>
              {pendingAppointments.map(appointment => (
                <Appointment key={appointment._id} {...appointment} />
              ))}
            </>
          )}
          {!pendingAppointments.length && !upcomingAppointments.length && (
            <NoAppointments />
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Home;
