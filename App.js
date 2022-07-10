import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Box, NativeBaseProvider} from 'native-base';
import React from 'react';
import theme from './nativebase.theme';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/router/App.navigator';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Box bgColor="white" flex={1}>
            <AppNavigator />
          </Box>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
