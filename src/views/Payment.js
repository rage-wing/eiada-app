import {Box, Spinner, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {api} from '../services/api';
import {useWindowDimensions} from 'react-native';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

const Payment = props => {
  const {width, height} = useWindowDimensions();
  const appointment = useSelector(state => state.appointment.appointment);

  const [paymentToken, setPaymentToken] = useState('');
  const [iframe, setIframe] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePaymentToken = useCallback(async () => {
    setLoading(true);
    setIframe(null);
    try {
      const res = await api.post(
        '/patient/appointment/generate-payment-token',
        {
          patient: appointment.patient,
        },
      );
      setPaymentToken(res.data.payload);
    } catch (error) {
      console.log(error.response.data);
    }
  }, [appointment]);

  useEffect(() => {
    generatePaymentToken();
  }, [generatePaymentToken]);

  useEffect(() => {
    if (paymentToken) {
      setIframe({
        html: `<iframe src="https://accept.paymobsolutions.com/api/acceptance/iframes/255397?payment_token=${paymentToken}" width="${width}" height="${height}"></iframe>`,
      });
      setLoading(false);
    }
  }, [paymentToken, width, height]);

  return (
    <VStack>
      <Box p={4}>
        <Header />
      </Box>
      {loading && <Spinner />}
      <KeyboardAwareScrollView h="full">
        {iframe && (
          <RenderHTML
            renderers={renderers}
            WebView={WebView}
            source={iframe}
            customHTMLElementModels={customHTMLElementModels}
            contentWidth={width}
          />
        )}
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default Payment;
