import {Button, HStack, Radio, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React, {useCallback, useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import {
  DatePicker,
  DateTimePicker,
} from '../components/elements/DateTimePicker';
import {useSelector, useDispatch} from 'react-redux';
import Field from '../components/elements/Field';
import {setAppointment} from '../redux/slices/appointment';
import {useNavigation} from '@react-navigation/native';
import appointmentService from '../services/appointment';

const CreateAppointment = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);

  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState(new Date());
  const [childGender, setChildGender] = useState('male');

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState('online');

  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userAddress, setUserAddress] = useState('');
  const [promo, setPromo] = useState('');

  const dispatch = useDispatch();

  const reserve = async data => {
    try {
      const res = await appointmentService.reserve(data);
      dispatch(setAppointment({data, payment: res.payload}));
      navigation.navigate('Checkout');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onSubmit = async () => {
    const data = {
      patient: user._id,
      childName,
      childBirthDate: childBirthDate.getTime(),
      childGender,
      date: appointmentDate.getTime(),
      type: appointmentType,
      phone: userPhoneNumber,
      promoCode: promo,
      userAddress,
    };
    reserve(data);
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
          <DatePicker
            placeholder="child birthdate"
            date={childBirthDate}
            setDate={setChildBirthDate}
            maximumDate={new Date()}
          />
          <Field label="promo code" value={promo} onChangeText={setPromo} />
          <DateTimePicker
            placeholder="Appointment date & time"
            dateTime={appointmentDate}
            setDateTime={setAppointmentDate}
            minimumDate={new Date()}
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
