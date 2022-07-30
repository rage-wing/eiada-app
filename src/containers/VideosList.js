import {HStack, Image, Pressable, ScrollView, Spinner, Text} from 'native-base';
import React, {useEffect, useState} from 'react';

import {Linking} from 'react-native';
import youtube from '../services/youtube';

const VideosList = props => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideos = async () => {
    setLoading(true);
    const videosItems = await youtube.getVideos();
    setVideos(videosItems);
    setLoading(false);
  };
  const openYoutube = videoId => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <HStack flexWrap="wrap" justifyContent="center" pb={32}>
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
      )}
    </ScrollView>
  );
};

export default VideosList;
