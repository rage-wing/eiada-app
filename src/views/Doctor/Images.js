import {VStack} from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import ImagesList from '../../containers/doctor/ImagesList';

const Images = props => {
  return (
    <VStack space={4} p={4}>
      <Header />
      <ImagesList />
    </VStack>
  );
};

export default Images;
