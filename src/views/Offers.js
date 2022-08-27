import {VStack} from 'native-base';
import React from 'react';
import Header from '../components/Header';
import OffersList from '../containers/OffersList';

const Offers = props => {
  return (
    <VStack space={4} p={4}>
      <Header />
      <OffersList />
    </VStack>
  );
};

export default Offers;
