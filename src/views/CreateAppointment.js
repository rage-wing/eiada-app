import {
  Button,
  HStack,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Radio,
  ScrollView,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import RNPaymobAccept from 'react-native-paymob-accept';
import {useDispatch, useSelector} from 'react-redux';
import {setAppointmentProp} from '../redux/slices/appointment';

const CreateAppointment = props => {
  const [appointmentType, setAppointmentType] = useState('online');
  const [form, setForm] = useState({});
  const appointment = useSelector(state => state.appointment.appointment);

  const handleSubmit = async () => {
    console.log(appointment);
    // RNPaymobAccept.payWithToken({
    //   paymentKey: '',
    //   token: "12345",
    //   maskedPanNumber: "XXXXXXXXXXXXXX1234",
    //   firstName: "first_name",
    //   lastName: "last_name",
    //   building: "building",
    //   floor: "floor",
    //   apartment: "apartment",
    //   city: "city",
    //   state: "state",
    //   country: "country",
    //   email: "email",
    //   phoneNumber: "phoneNumber",
    //   postalCode: "postalCode",
    // });
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Tabs
        tabs={['online', 'in-person']}
        currentTab={appointmentType}
        setCurrentTab={setAppointmentType}
      />

      <Form form={form} setForm={setForm} />

      <Button onPress={handleSubmit}>Reserve Appointment</Button>
    </VStack>
  );
};

const Form = () => {
  const dispatch = useDispatch();
  const appointment = useSelector(state => state.user.appointment);

  const handleChange = (name, value) => {
    dispatch(setAppointmentProp({name, value}));
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <VStack space={4}>
          <Input
            variant="filled"
            size="lg"
            placeholder="child name"
            value={appointment.childName}
            onChangeText={value => handleChange('childName', value)}
          />
          <Input
            keyboardType="phone-pad"
            variant="filled"
            size="lg"
            placeholder="phone number"
            value={appointment.phoneNumber}
            onChangeText={value => handleChange('phoneNumber', value)}
          />
          <Input
            variant="filled"
            size="lg"
            value={appointment.address}
            placeholder="address"
            onChangeText={value => handleChange('address', value)}
          />
          <Pressable
            onPress={() => {
              DateTimePickerAndroid.open({
                value: appointment.date || new Date(),
                onChange: (event, value) => {
                  handleChange('date', value);
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
              value={
                appointment.date ? appointment.date.toLocaleDateString() : ''
              }
            />
          </Pressable>
          <Radio.Group
            name="gender"
            value={appointment.gender}
            onChange={value => handleChange('gender', value)}>
            <HStack space={4}>
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </HStack>
          </Radio.Group>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAppointment;
