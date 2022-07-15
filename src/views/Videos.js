import {HStack, Image, Pressable, ScrollView, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';

import keys from '../config/keys.json';
import axios from 'axios';
import Header from '../components/Header';
import {Linking} from 'react-native';

const Videos = props => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const res =
      await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${keys.YT_API_KEY}
      &channelId=${keys.YT_Channel_ID}
      &part=snippet,id&order=date&maxResults=20`);
    const videosItems = res.data.items;
    setVideos(videosItems);
  };
  const openYoutube = videoId => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <VStack space={4} p={4}>
      <Header />
      <ScrollView>
        <HStack flexWrap="wrap" justifyContent="center" pb={20}>
          {videos.map((video, idx) => (
            <Pressable
              key={video.id.videoId}
              onPress={() => openYoutube(video.id.videoId)}
              bgColor="gray.200"
              p={2}
              m={1}
              rounded={6}
              width={150}>
              <Image
                source={{uri: video.snippet.thumbnails.high.url}}
                alt={video.snippet.title}
                height={140}
                rounded={6}
                mb={2}
              />
              <Text fontWeight="bold" textAlign="center" color="gray.600">
                {video.snippet.title}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default Videos;
