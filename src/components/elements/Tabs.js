import {Box, HStack, Pressable, Text} from 'native-base';
import React from 'react';

const Tabs = ({tabs, currentTab, setCurrentTab}) => {
  return (
    <HStack space={4}>
      {tabs.map((tab, idx) => (
        <Box flex={1} key={`tab-${tab}-${idx}`}>
          <Pressable onPress={() => setCurrentTab(tab)}>
            <Box
              p={3}
              rounded={6}
              alignItems="center"
              bgColor={currentTab === tab ? 'secondary.500' : 'gray.200'}>
              <Text color="#000">{tab}</Text>
            </Box>
          </Pressable>
        </Box>
      ))}
    </HStack>
  );
};

export default Tabs;
