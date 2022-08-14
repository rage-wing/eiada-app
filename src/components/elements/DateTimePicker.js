import {Box, Pressable} from 'native-base';
import React, {useState, useEffect} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Field from './Field';

// utils
const toDateTime = (ISODate, ISOTime) =>
  new Date(ISODate.substr(0, 11) + ISOTime.substr(11));

// exports
const DatePicker = ({placeholder, date, setDate, ...props}) => {
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState();

  useEffect(() => {
    setDateValue(moment(date).format('MMM DD, YYYY'));
  }, [date]);

  const onChange = (event, value) => {
    setShow(false);
    setDate(value);
  };

  return (
    <Box>
      <Pressable onPress={() => setShow(true)}>
        <Field
          label={placeholder || 'Select date'}
          isReadOnly
          value={dateValue}
        />
      </Pressable>
      {show && (
        <RNDateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          {...props}
        />
      )}
    </Box>
  );
};

const TimePicker = ({placeholder, time, setTime, ...props}) => {
  const [show, setShow] = useState(false);
  const [timeValue, setTimeValue] = useState();

  useEffect(() => {
    setTimeValue(moment(time).format('hh:mm a'));
  }, [time]);

  const onChange = (event, value) => {
    setShow(false);
    setTime(value);
  };

  return (
    <Box>
      <Pressable onPress={() => setShow(true)}>
        <Field
          label={placeholder || 'Select time'}
          isReadOnly
          value={timeValue}
        />
      </Pressable>
      {show && (
        <RNDateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          {...props}
        />
      )}
    </Box>
  );
};

const DateTimePicker = ({placeholder, dateTime, setDateTime, ...props}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState();
  const [dateTimeValue, setDateTimeValue] = useState();

  const onChange = (event, value) => {
    setShow(false);
    if (event.type === 'set') {
      if (mode === 'date') {
        setDate(value);
        setMode('time');
        setShow(true);
      } else {
        setMode('date');
        setDateTime(toDateTime(date.toISOString(), value.toISOString()));
      }
    } else {
      setMode('date');
      setDateTime(value);
    }
  };

  useEffect(() => {
    const value = moment(dateTime).format('MMM DD, YYYY hh:mm A');
    setDateTimeValue(value);
  }, [dateTime]);

  return (
    <Box>
      <Pressable onPress={() => setShow(true)}>
        <Field
          label={placeholder || 'Select date and time'}
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
          {...props}
        />
      )}
    </Box>
  );
};

export {DatePicker, TimePicker, DateTimePicker};
