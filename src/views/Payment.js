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

  const [csk, setCsk] = useState('');
  const [iframe, setIframe] = useState(null);
  const [loading, setLoading] = useState(false);

  const createIntention = useCallback(async () => {
    try {
      setLoading(true);
      setIframe(null);
      const res = await api.post(
        `/patient/appointment/${appointment.patient}/reserve`,
      );
      console.log(res.data);
      setCsk(res.data.payload.client_secret);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [appointment]);

  useEffect(() => {
    createIntention();
  }, [createIntention]);

  useEffect(() => {
    if (csk) {
      setIframe({
        html: `<iframe src="https://eiada-pay.vercel.app/?csk=${csk}" width="${width}" height="${height}"></iframe>`,
      });
      setLoading(false);
    }
  }, [csk, width, height]);

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
