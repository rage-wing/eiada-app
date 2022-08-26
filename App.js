import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Box, NativeBaseProvider} from 'native-base';
import React from 'react';
import theme from './nativebase.theme';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/router/App.navigator';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://d173e589bad546d59d5c8d86075ee564@o1369145.ingest.sentry.io/6672097',
  tracesSampleRate: 1.0,
});

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer theme={NavigationTheme}>
          <Box bgColor="white" flex={1}>
            <AppNavigator />
          </Box>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default Sentry.wrap(App);
