import {Input, VStack} from 'native-base';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ContactUs = props => {
  const user = useSelector(state => state.user.user);
  const [form, setForm] = useState({
    name: user.displayName,
    phone: user.phoneNumber,
    email: user.email,
    subject: '',
    message: '',
  });

  return (
    <VStack space={4} p={4}>
      <Header />

      <KeyboardAwareScrollView>
        <VStack space={4} pb={24}>
          <Input
            variant="filled"
            size="lg"
            placeholder="name"
            value={form.name}
            onChangeText={text => setForm({...form, name: text})}
          />
          <Input
            keyboardType="phone-pad"
            variant="filled"
            size="lg"
            placeholder="phone number"
            value={form.phone}
            onChangeText={text => setForm({...form, phone: text})}
          />
          <Input
            variant="filled"
            size="lg"
            placeholder="email"
            value={form.email}
            onChangeText={text => setForm({...form, email: text})}
          />
          <Input
            variant="filled"
            size="lg"
            placeholder="subject"
            value={form.subject}
            onChangeText={text => setForm({...form, subject: text})}
          />
          <Input
            multiline={true}
            numberOfLines={4}
            variant="filled"
            size="lg"
            placeholder="message"
            value={form.message}
            onChangeText={text => setForm({...form, message: text})}
          />
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default ContactUs;
