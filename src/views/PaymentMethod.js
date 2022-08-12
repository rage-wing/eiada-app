import React, {useState} from 'react';
import {HStack, Image, Pressable, Text, VStack} from 'native-base';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';

const PaymentMethod = props => {
  const navigation = useNavigation();

  const onPaymentMethodChange = value => {
    navigation.navigate('Payment', {paymentMethod: value});
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Text fontSize="2xl" fontWeight="black">
        Payment Methods
      </Text>

      <Text fontSize="lg" fontWeight="bold">
        Cards
      </Text>
      <Pressable onPress={() => onPaymentMethodChange('visa')}>
        <HStack alignItems="center" space={4}>
          <Image source={require('../assets/cards/visa.png')} alt="visa" />
          <Text fontSize="lg" fontWeight="bold">
            Visa
          </Text>
        </HStack>
      </Pressable>
      <Pressable onPress={() => onPaymentMethodChange('mastercard')}>
        <HStack alignItems="center" space={4}>
          <Image
            source={require('../assets/cards/mastercard.png')}
            alt="mastercard"
          />
          <Text fontSize="lg" fontWeight="bold">
            Mastercard
          </Text>
        </HStack>
      </Pressable>
      <Text fontSize="lg" fontWeight="bold">
        E-Wallets
      </Text>
      <Pressable onPress={() => onPaymentMethodChange('vodafone')}>
        <HStack alignItems="center" space={4}>
          <Image
            source={require('../assets/cards/vodafone.png')}
            alt="vodafone"
          />
          <Text fontSize="lg" fontWeight="bold">
            Vodafone cash
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default PaymentMethod;
