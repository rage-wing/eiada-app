import {Box, HStack, Icon, IconButton, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Spinner from '../components/Spinner';
import moment from 'moment';

const Appointment = props => {
  const appointment = props.route.params;
  const {doctor} = appointment;
  const [timeDiff, setTimeDiff] = useState(
    moment(appointment.date).diff(moment(), 'seconds'),
  );

  const message = () => {
    const messages = {
      pending: 'hasn’t accepted your reservation yet',
      accepted:
        'has accepted your reservation please get ready for the appointment',
      cancelled: 'has cancelled your reservation, sorry for the inconvenience',
    };

    return messages[appointment.status];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const appointmentTime = moment(appointment.date);
      const diff = appointmentTime.diff(now, 'seconds');
      setTimeDiff(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [appointment.date]);

  return (
    <VStack space={4} p={4}>
      <Header />
      <HStack justifyContent="space-between" alignItems="center">
        <Profile
          photo={doctor.user.photoURL}
          name={doctor.user.displayName}
          sub={doctor.speciality}
        />
        <Box>
          <IconButton
            colorScheme="secondary"
            rounded="full"
            variant="solid"
            _icon={{
              as: IonIcon,
              name: appointment.type === 'in-person' ? 'location' : 'videocam',
            }}
          />
        </Box>
      </HStack>
      <Text textAlign="center">
        Dr.{doctor.user.displayName} {message()}
      </Text>
      <HStack justifyContent="center" alignItems="center" space={4}>
        {timeDiff >= 0 && (
          <Spinner
            p={4}
            h={12}
            w={12}
            rounded={6}
            alignItems="center"
            justifyContent="center"
            bgColor="secondary.400">
            <Icon as={IonIcon} name="sync-outline" />
          </Spinner>
        )}
        <Text
          fontSize="xl"
          textTransform="capitalize"
          fontWeight="bold"
          textAlign="center"
          color="secondary.500">
          {timeDiff < 0 && 'the appointment was '}
          {moment(appointment.date).fromNow()}
        </Text>
      </HStack>
      <Text fontSize="xl" fontWeight="black">
        About Dr.{doctor.user.displayName}
      </Text>
      <Text>{doctor.about}</Text>
    </VStack>
  );
};

export default Appointment;
