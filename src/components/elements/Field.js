import {Box, Input, Text} from 'native-base';
import React from 'react';

const Field = ({label, error, ...props}) => {
  return (
    <Box>
      <Text
        fontSize="xs"
        color="gray.400"
        fontWeight="bold"
        textTransform="capitalize">
        {label}
      </Text>
      <Input
        variant="filled"
        size="lg"
        placeholder={label}
        borderColor={error ? 'red.500' : 'gray.300'}
        {...props}
      />
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default Field;
