import {HStack, Image, Pressable, ScrollView, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import offer from '../services/offer';

const OffersList = props => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOffers = async () => {
    setLoading(true);
    const {payload} = await offer.getAll();
    setOffers(payload.docs);
    setLoading(false);
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <HStack flexWrap="wrap" justifyContent="center" pb={32}>
          {offers.map((img, idx) => (
            <Pressable
              key={img._id}
              onPress={() => Linking.openURL(img.url)}
              m={1}
              rounded={6}
              width={150}>
              <Image
                source={{uri: img.thumbnail}}
                alt={img.url}
                height={140}
                rounded={6}
              />
            </Pressable>
          ))}
        </HStack>
      )}
    </ScrollView>
  );
};

export default OffersList;
