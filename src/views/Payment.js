import {Box, Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {useWindowDimensions} from 'react-native';

import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

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
        html: `<iframe src="https://eiada-pay.vercel.app/?csk=${appointment?.payment?.client_secret}&id=${appointment?.payment?.id}" width="${width}""></iframe>`,
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
      <VStack bgColor={'#0f0'}>
        {iframe && (
          <RenderHTML
            renderers={renderers}
            WebView={WebView}
            source={iframe}
            customHTMLElementModels={customHTMLElementModels}
            contentWidth={width}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Payment;
