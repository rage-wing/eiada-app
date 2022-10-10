import {
  Box,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {BackHandler, Platform, useWindowDimensions} from 'react-native';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

const Payment = props => {
  const {width, height} = useWindowDimensions();
  const appointment = useSelector(state => state.appointment.appointment);
  const navigation = useNavigation();

  const [iframe, setIframe] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment?.payment?.client_secret) {
      console.log(appointment?.payment?.id);
      setIframe({
        html: `<iframe src="https://eiada-pay.vercel.app/?csk=${
          appointment?.payment?.client_secret
        }&id=${appointment?.payment?.id}" width="${width}" height="${
          height - 170
        }"></iframe>`,
      });
      setLoading(false);
    }
  }, [appointment, width, height]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <VStack flex={1}>
      <Box p={4}>
        <Header />
      </Box>
      {loading && <Spinner />}
      <VStack flex={1} bgColor="red.300">
        <KeyboardAwareScrollView
          behavior={Platform.select({ios: 'position', android: null})}
          enabled>
          {iframe && (
            <RenderHTML
              renderers={renderers}
              WebView={WebView}
              source={iframe}
              customHTMLElementModels={customHTMLElementModels}
              contentWidth={width}
              contentHeight={height}
            />
          )}
        </KeyboardAwareScrollView>
      </VStack>
    </VStack>
  );
};

export default Payment;
