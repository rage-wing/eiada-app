import {
  Button,
  HStack,
  Input,
  Modal,
  Radio,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import React, {useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import DateTimePicker from '../components/elements/DateTimePicker';
import {useSelector} from 'react-redux';
import appointment from '../services/appointment';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const CreateAppointment = props => {
  const user = useSelector(state => state.user.user);
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState(new Date());
  const [childGender, setChildGender] = useState('male');

  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState('online');

  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userAddress, setUserAddress] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [paymentToken, setPaymentToken] = useState('');

  const onSubmit = async () => {
    // const res = await appointment.reserve({
    //   patient: user._id,
    //   childName,
    //   childBirthDate,
    //   childGender,
    //   date: appointmentDate,
    //   time: appointmentTime,
    //   type: appointmentType,
    //   userPhoneNumber,
    //   userAddress,
    // });

    // setPaymentToken(res.payload.paymentToken);
    // console.log(res.payload.paymentToken);
    setShowModal(true);
  };

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  const source = {
    html: `
      <iframe src="https://accept.paymobsolutions.com/api/acceptance/iframes/255397?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBiblJsWjNKaGRHbHZibDlwWkNJNk5ESXpNREl4TENKaWFXeHNhVzVuWDJSaGRHRWlPbnNpWm1seWMzUmZibUZ0WlNJNklrRmlaR1ZzYUdGdGFXVmtJaXdpYkdGemRGOXVZVzFsSWpvaWJXOXpkR0ZtWVNJc0luTjBjbVZsZENJNklrNUJJaXdpWW5WcGJHUnBibWNpT2lKT1FTSXNJbVpzYjI5eUlqb2lUa0VpTENKaGNHRnlkRzFsYm5RaU9pSk9RU0lzSW1OcGRIa2lPaUpPUVNJc0luTjBZWFJsSWpvaVRrRWlMQ0pqYjNWdWRISjVJam9pVGtFaUxDSmxiV0ZwYkNJNkltRmlaR1ZzYUdGdGFXVmtNakF3UUdkdFlXbHNMbU52YlNJc0luQm9iMjVsWDI1MWJXSmxjaUk2SWlzeU1ERXdNREV3TURFd01DSXNJbkJ2YzNSaGJGOWpiMlJsSWpvaVRrRWlMQ0psZUhSeVlWOWtaWE5qY21sd2RHbHZiaUk2SWs1QkluMHNJbVY0Y0NJNk1UWTJNVEUyT0RjMU55d2liM0prWlhKZmFXUWlPall4T0RZeE56SXdMQ0oxYzJWeVgybGtJam94T0RnNE1qRXNJbUZ0YjNWdWRGOWpaVzUwY3lJNk16VXdNQ3dpWTNWeWNtVnVZM2tpT2lKRlIxQWlMQ0p3Yld0ZmFYQWlPaUkxTkM0eE56QXVNakUzTGpFeklpd2liRzlqYTE5dmNtUmxjbDkzYUdWdVgzQmhhV1FpT21aaGJITmxmUS4xR0M2a1N5aXJHRXp3TGdNRkd0ZndTcFM0cm0xS2lyRmpfUUR2d1JxcUVHUmFwOXhhY2xEakNMV1pKMWJZV1pHT3BpR1dkUWxjVGtMWGRZd3BGeC1xZw" width="100%" height="100%" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>
    `,
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
          <Input
            variant="filled"
            size="lg"
            placeholder="child name"
            value={childName}
            onChangeText={setChildName}
          />
          <Input
            keyboardType="phone-pad"
            variant="filled"
            size="lg"
            placeholder="phone number"
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
          />
          <Input
            variant="filled"
            size="lg"
            value={userAddress}
            placeholder="address"
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Pay</Modal.Header>
          <Modal.Body>
            <ScrollView h="full">
              <Text>hello</Text>
              <RenderHTML
                renderers={renderers}
                WebView={WebView}
                source={source}
                customHTMLElementModels={customHTMLElementModels}
                defaultWebViewProps={
                  {
                    /* Any prop you want to pass to all WebViews */
                  }
                }
                renderersProps={{
                  iframe: {
                    scalesPageToFit: true,
                    webViewProps: {
                      /* Any prop you want to pass to iframe WebViews */
                    },
                  },
                }}
              />
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

export default CreateAppointment;
