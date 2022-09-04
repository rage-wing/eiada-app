import {Box, Spinner, Text, VStack} from 'native-base';
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

  const [iframe, setIframe] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointment?.payment?.client_secret) {
      setIframe({
        html: `<iframe src="https://eiada-pay.vercel.app/?csk=${appointment?.payment?.client_secret}" width="${width}" height="${height}"></iframe>`,
      });
      setLoading(false);
    }
  }, [appointment, width, height]);

  return (
    <VStack>
      <Box p={4}>
        <Header />
      </Box>
      {loading && <Spinner />}
      <KeyboardAwareScrollView>
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
