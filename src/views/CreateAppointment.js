import {Button, HStack, Radio, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React, {useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import DateTimePicker from '../components/elements/DateTimePicker';
import {useSelector, useDispatch} from 'react-redux';
import Field from '../components/elements/Field';
import {setAppointment} from '../redux/slices/appointment';
import {useNavigation} from '@react-navigation/native';

const CreateAppointment = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);

  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState(new Date());
  const [childGender, setChildGender] = useState('male');

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState('online');

  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userAddress, setUserAddress] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async () => {
    const data = {
      patient: user._id,
      childName,
      childBirthDate: childBirthDate.getTime(),
      childGender,
      date: appointmentDate.getTime(),
      time: appointmentTime.getTime(),
      type: appointmentType,
      userPhoneNumber,
      userAddress,
    };

    dispatch(setAppointment(data));
    navigation.navigate('PaymentMethod');
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Tabs
        tabs={['online', 'in-person']}
        currentTab={appointmentType}
        setCurrentTab={tab => {
          setAppointmentType(tab);
        }}
      />
      <KeyboardAwareScrollView>
        <VStack space={4} pb={32}>
          <Field
            label="child name"
            value={childName}
            onChangeText={setChildName}
          />
          <Field
            label="phone number"
            keyboardType="phone-pad"
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
          />

          <Field
            label="address"
            value={userAddress}
            onChangeText={setUserAddress}
          />
          <DateTimePicker
            placeholder="child birthdate"
            mode="date"
            dateTime={childBirthDate}
            setDateTime={setChildBirthDate}
          />
          <DateTimePicker
            placeholder="Appointment Date"
            mode="date"
            dateTime={appointmentDate}
            setDateTime={setAppointmentDate}
          />
          <DateTimePicker
            placeholder="Appointment Time"
            mode="time"
            dateTime={appointmentTime}
            setDateTime={setAppointmentTime}
          />
          <Radio.Group
            name="gender"
            value={childGender}
            onChange={setChildGender}>
            <HStack space={4}>
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </HStack>
          </Radio.Group>

          <Button onPress={onSubmit}>Reserve Appointment</Button>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default CreateAppointment;
