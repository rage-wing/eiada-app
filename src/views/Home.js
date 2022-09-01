import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  ScrollView,
  Center,
  Image,
} from 'native-base';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import Appointment from '../components/Appointment';
import appointmentService from '../services/appointment';

const NoAppointments = () => (
  <Center my="auto" mt={12}>
    <Box w="full" h={200}>
      <Image
        source={require('../assets/no_appointments.png')}
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
  const user = useSelector(state => state.user.user);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [historyAppointments, setHistoryAppointments] = useState([]);

  const getUpcomingAppointments = useCallback(async () => {
    const res = await appointmentService.getAll(user._id);
    setUpcomingAppointments(res.payload);
  }, [user._id]);

  const getHistoryAppointments = useCallback(async () => {
    const res = await appointmentService.getHistory(user._id);
    setHistoryAppointments(res.payload);
  }, [user._id]);

  useEffect(() => {
    getUpcomingAppointments();
    getHistoryAppointments();
  }, [getHistoryAppointments, getUpcomingAppointments]);

  return (
    <VStack space={4} p={4}>
      <Header />
      <Box>
        <Button onPress={() => props.navigation.navigate('CreateAppointment')}>
          Reserve an Appointment
        </Button>
      </Box>

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
          {!!historyAppointments.length && (
            <>
              <Text fontSize="2xl" fontWeight="black">
                History
              </Text>
              {historyAppointments.map(appointment => (
                <Appointment key={appointment._id} {...appointment} />
              ))}
            </>
          )}
          {!historyAppointments.length && !upcomingAppointments.length && (
            <NoAppointments />
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Home;
