import React, {useEffect, useState} from 'react';
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

const Home = props => {
  const user = useSelector(state => state.user.user);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const res = await appointmentService.getAll(user._id);
    setAppointments(res.payload);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <VStack space={4} p={4}>
      <Header />
      <Box>
        <Button onPress={() => props.navigation.navigate('CreateAppointment')}>
          Reserve an Appointment
        </Button>
      </Box>
      {!appointments.length && (
        <Center my="auto" mt={12}>
          <Box w="full" h={200}>
            <Image
              source={require('../assets/no_appointments.png')}
              flex={1}
              alt="no appointments"
            />
          </Box>
          <Text
            color="gray.400"
            fontSize="2xl"
            textAlign="center"
            fontWeight="bold">
            you haven't reserved any appointments yet
          </Text>
        </Center>
      )}
      {!!appointments.length && (
        <ScrollView>
          <VStack space={4} pb={40}>
            <Text fontSize="2xl" fontWeight="black">
              Upcoming Appointments
            </Text>
            {appointments.map(appointment => (
              <Appointment key={appointment._id} {...appointment} />
            ))}
            <Text fontSize="2xl" fontWeight="black">
              History
            </Text>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};

export default Home;
