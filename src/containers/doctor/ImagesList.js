import {Box, Button, Image, Pressable, ScrollView, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import image from '../../services/image';
import {launchImageLibrary} from 'react-native-image-picker';
import Alert from '../../components/elements/Alert';

const ImagesList = props => {
  const [images, setImages] = useState([]);
  const [deleteImageModalOpen, setDeleteImageModalOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState();
  const [refreshing, setRefreshing] = useState(false);

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

  const remove = async idx => {
    try {
      const arr = [...images];
      await image.remove(images[idx]._id);
      arr.splice(idx, 1);
      setImages(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const upload = async () => {
    try {
      const result = await launchImageLibrary({
        includeBase64: true,
      });
      const file = result.assets[0];
      const res = await image.upload(file.base64);
      setImages([...images, res.payload]);
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
        <Alert
          isOpen={deleteImageModalOpen}
          setIsOpen={setDeleteImageModalOpen}
          title="delete image"
          body="are you sure you want to delete this image"
          onConfirm={() => remove(currentImageIdx)}
        />
        {images.map((img, idx) => (
          <Pressable
            key={img._id}
            onPress={() => onPress(img)}
            m={1}
            rounded={6}>
            <Image
              source={{
                uri: img.url,
              }}
              alt={img.url}
              height={140}
              rounded={6}
              resizeMode="cover"
            />
            <Box position="absolute" bottom={4} right={4}>
              <Button
                colorScheme="danger"
                onPress={() => {
                  setCurrentImageIdx(idx);
                  setDeleteImageModalOpen(true);
                }}>
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
