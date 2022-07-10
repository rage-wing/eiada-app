import {Box, HStack, IconButton, Icon, Image, Text} from 'native-base';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Appointment = props => {
  return (
    <Box bgColor="gray.100" px={4} py={2} rounded="2xl">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={2} alignItems="center">
          <Image
            rounded="xl"
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            width={60}
            height={60}
            resizeMode="cover"
          />
          <Box>
            <Text fontSize={18} fontWeight="bold">
              dr.name
            </Text>
            <Text>dr.speciality</Text>
          </Box>
        </HStack>
        <IconButton
          rounded="full"
          variant="ghost"
          bgColor="gray.200"
          icon={<Icon as={IonIcon} name="videocam" size={5} />}
        />
      </HStack>
      <Box bgColor="gray.200" mt={2} p={2} rounded="full">
        <HStack justifyContent="center" space={2}>
          {/* <Icon as={Ionicons} name={"newspaper"} size={6} /> */}
          <Text>sun, jan 19, 08:00 am - 10:00 am</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default Appointment;
