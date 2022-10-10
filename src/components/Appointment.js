import {useNavigation} from '@react-navigation/native';
import {
  Box,
  HStack,
  IconButton,
  Icon,
  Image,
  Text,
  Pressable,
} from 'native-base';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import strMax from '../utils/strMax';
import Spinner from './Spinner';

const Appointment = props => {
  const {doctor} = props;
  const navigation = useNavigation();
  const openAppointment = () => {
    navigation.navigate('Appointment', props);
  };

  const ActionIcon = () => {
    const {status, type} = props;

    if (status === 'cancelled') {
      return <Icon as={IonIcon} name="close" />;
    } else if (
      status === 'pending' &&
      new Date(props.date).getTime() < new Date().getTime()
    ) {
      return <Icon as={IonIcon} name="close" />;
    } else if (status === 'pending') {
      return (
        <Spinner>
          <Icon as={IonIcon} name="sync-outline" />
        </Spinner>
      );
    } else if (type === 'in-person') {
      return <Icon as={IonIcon} name="location" />;
    } else if (type === 'online') {
      return <Icon as={IonIcon} name="videocam" />;
    }
    return null;
  };

  return (
    <Pressable onPress={openAppointment}>
      <Box bgColor="gray.100" px={4} py={2} rounded={6}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space={2} alignItems="center">
            <Image
              rounded="xl"
              source={{
                uri: doctor.user.photoURL,
              }}
              alt={doctor.user.displayName}
              width={60}
              height={60}
              resizeMode="cover"
            />
            <Box>
              <Text fontSize={18} fontWeight="bold">
                {strMax(doctor.user.displayName, 17)}
              </Text>
              <Text>{doctor.speciality}</Text>
            </Box>
          </HStack>
          <IconButton
            rounded={6}
            bgColor="secondary.500"
            icon={<ActionIcon />}
          />
        </HStack>
        <Box bgColor="primary.500" mt={2} p={2} rounded={6}>
          <HStack justifyContent="center" alignItems="center" space={2}>
            <Icon as={IonIcon} name="hourglass-outline" color="#fff" size={6} />
            <Text color="#fff">{new Date(props.date).toUTCString()}</Text>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default Appointment;
