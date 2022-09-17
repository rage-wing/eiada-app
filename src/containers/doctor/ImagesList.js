import {Box, Button, Image, Pressable, ScrollView, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import image from '../../services/image';
import {launchImageLibrary} from 'react-native-image-picker';

const ImagesList = props => {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getImages = useCallback(async () => {
    const {payload} = await image.getAll();
    setImages(payload.docs);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getImages();
    setRefreshing(false);
  }, [getImages]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const onPress = img => {
    console.log(img);
  };

  const remove = async id => {
    await image.remove(id);
  };

  const upload = async () => {
    try {
      const result = await launchImageLibrary({
        includeBase64: true,
      });
      const file = result.assets[0];
      console.log(file);
      const res = await image.upload(file);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <VStack pb={32}>
        {images.map((img, idx) => (
          <Pressable
            key={img._id}
            onPress={() => onPress(img.originalname)}
            m={1}
            rounded={6}>
            <Image
              // source={{uri: img.url}}
              source={{
                uri: 'https://images.pexels.com/photos/13292768/pexels-photo-13292768.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
              }}
              alt={img.originalname}
              height={140}
              rounded={6}
              resizeMode="cover"
            />
            <Box position="absolute" bottom={4} right={4}>
              <Button colorScheme="danger" onPress={() => remove(img._id)}>
                remove
              </Button>
            </Box>
          </Pressable>
        ))}
        <Button colorScheme="primary" onPress={upload}>
          add more
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default ImagesList;
