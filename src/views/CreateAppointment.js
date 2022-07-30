import {
  Button,
  HStack,
  Input,
  Pressable,
  Radio,
  Text,
  VStack,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React, {useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {setAppointmentProp} from '../redux/slices/appointment';
import moment from 'moment';

const CreateAppointment = props => {
  const [appointmentType, setAppointmentType] = useState('online');
  const appointment = useSelector(state => state.appointment.appointment);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    dispatch(setAppointmentProp({name, value}));
  };

  const handleSubmit = async () => {
    console.log(appointment);
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Tabs
        tabs={['online', 'in-person']}
        currentTab={appointmentType}
        setCurrentTab={tab => {
          setAppointmentType(tab);
          handleChange('type', tab);
        }}
      />
      <KeyboardAwareScrollView>
        <VStack space={4} pb={32}>
          <Input
            variant="filled"
            size="lg"
            placeholder="child name"
            value={appointment?.childName}
            onChangeText={value => handleChange('childName', value)}
          />
          <Input
            keyboardType="phone-pad"
            variant="filled"
            size="lg"
            placeholder="phone number"
            value={appointment?.phoneNumber}
            onChangeText={value => handleChange('phoneNumber', value)}
          />
          <Input
            variant="filled"
            size="lg"
            value={appointment?.address}
            placeholder="address"
            onChangeText={value => handleChange('address', value)}
          />
          <Pressable
            onPress={() => {
              DateTimePickerAndroid.open({
                value: new Date(appointment?.date),
                onChange: (event, value) => {
                  handleChange('date', value.getTime());
                },
                mode: 'date',
                is24Hour: true,
              });
            }}>
            <Input
              variant="filled"
              size="lg"
              placeholder="child birthdate"
              isReadOnly
              value={moment(appointment?.date).format('MMMM Do YYYY')}
            />
          </Pressable>
          <Radio.Group
            name="gender"
            value={appointment?.gender}
            onChange={value => handleChange('gender', value)}>
            <HStack space={4}>
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </HStack>
          </Radio.Group>

          <Button onPress={handleSubmit}>Reserve Appointment</Button>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default CreateAppointment;
