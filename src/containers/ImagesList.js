import {HStack, Image, Pressable, ScrollView, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import image from '../services/image';

const ImagesList = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    const {payload} = await image.getAll();
    setImages(payload.docs);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  const onPress = img => {
    console.log(img);
  };

  return (
    <ScrollView>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <HStack flexWrap="wrap" justifyContent="center" pb={32}>
          {images.map((img, idx) => (
            <Pressable
              key={img.id}
              onPress={() => onPress(img.originalname)}
              m={1}
              rounded={6}
              width={150}>
              <Image
                source={{uri: img.url}}
                alt={img.originalname}
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

export default ImagesList;
