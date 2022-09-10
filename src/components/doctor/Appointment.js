import {Box, HStack, Image, Text, Button, VStack} from 'native-base';
import React from 'react';
import strMax from '../../utils/strMax';

const Appointment = props => {
  const {patient} = props;

  const accept = async () => {};

  const reject = async () => {
    console.log('reject');
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
          <Button w="1/2" colorScheme="success" onPress={accept}>
            accept
          </Button>
          <Button w="1/2" colorScheme="danger" onPress={reject}>
            reject
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default Appointment;
