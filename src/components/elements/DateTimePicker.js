import {Box, Input, Pressable} from 'native-base';
import React, {useState} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DateTimePicker = ({mode, placeholder, dateTime, setDateTime}) => {
  const [show, setShow] = useState(false);

  const onChange = (event, value) => {
    setShow(false);
    setDateTime(value);
  };

  return (
    <Box>
      <Pressable onPress={() => setShow(true)}>
        <Input
          variant="filled"
          size="lg"
          placeholder={placeholder || `Select ${mode}`}
          isReadOnly
          value={moment(dateTime).format('MMMM Do YYYY')}
        />
      </Pressable>
      {show && (
        <RNDateTimePicker
          value={dateTime}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default DateTimePicker;
