import {Box, Input, Pressable} from 'native-base';
import React, {useState, useEffect} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Field from './Field';

const DateTimePicker = ({mode, placeholder, dateTime, setDateTime}) => {
  const [show, setShow] = useState(false);
  const [dateTimeValue, setDateTimeValue] = useState();

  const onChange = (event, value) => {
    setShow(false);
    setDateTime(value);
  };

  useEffect(() => {
    const value = moment(dateTime).format(
      mode === 'date' ? 'MMM DD, YYYY' : 'hh:mm A',
    );
    setDateTimeValue(value);
  }, [mode, dateTime]);

  return (
    <Box>
      <Pressable onPress={() => setShow(true)}>
        <Field
          label={placeholder || `Select ${mode}`}
          isReadOnly
          value={dateTimeValue}
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
