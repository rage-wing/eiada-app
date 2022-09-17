import {Box, HStack, Image, Text, Button, VStack} from 'native-base';
import React from 'react';
import {Alert} from 'react-native';
import doctor from '../../services/doctor';
import strMax from '../../utils/strMax';

const Appointment = props => {
  const {patient, refresh} = props;

  const onAccept = async () => {
    Alert.alert(
      'are you sure?',
      'are you sure you want to accept the appointment',
      [{text: 'Yes', onPress: accept}, {text: 'No'}],
    );
  };

  const onReject = async () => {
    Alert.alert(
      'are you sure?',
      'are you sure you want to reject the appointment',
      [{text: 'Yes', onPress: reject}, {text: 'No'}],
    );
  };

  const accept = async () => {
    await doctor.accept(props._id);
    refresh();
  };
  const reject = async () => {
    await doctor.reject(props._id);
    refresh();
  };

  return (
    <VStack bgColor="gray.100" space={2} px={4} py={2} rounded={6}>
      <HStack space={2} alignItems="center">
        <Image
          rounded="xl"
          source={{
            uri: patient.photoURL,
          }}
          alt={patient.displayName}
          width={60}
          height={60}
          resizeMode="cover"
        />
        <Box>
          <Text fontSize={18} fontWeight="bold">
            {strMax(patient.displayName, 25)}
          </Text>
          <Text>{new Date(props.date).toUTCString()}</Text>
        </Box>
      </HStack>
      {['draft', 'pending'].includes(props.status) && (
        <HStack space={2}>
          <Button w="1/2" colorScheme="success" onPress={onAccept}>
            accept
          </Button>
          <Button w="1/2" colorScheme="danger" onPress={onReject}>
            reject
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default Appointment;
