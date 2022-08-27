import {ScrollView, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import aboutService from '../services/about';
import RenderHtml from 'react-native-render-html';

const About = props => {
  const [about, setAbout] = useState({});

  const getAbout = async () => {
    const aboutDetails = await aboutService.get();
    setAbout(aboutDetails.payload);
  };

  useEffect(() => {
    getAbout();
  }, []);

  const source = {
    html: `
      <div style="color:#000;">
        ${about.content}
      </div>
    `,
  };

  return (
    <VStack space={4} p={4}>
      <Header />

      <Text fontSize="4xl" fontWeight="bold" lineHeight="xs">
        {about.title}
      </Text>

      <ScrollView>
        <RenderHtml source={source} contentWidth={200} />
      </ScrollView>
    </VStack>
  );
};

export default About;
