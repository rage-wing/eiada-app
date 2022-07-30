import {VStack} from 'native-base';
import React, {useState} from 'react';
import Tabs from '../components/elements/Tabs';
import Header from '../components/Header';
import ImagesList from '../containers/ImagesList';
import VideosList from '../containers/VideosList';

const Gallery = props => {
  const tabs = ['Images', 'Videos'];
  const [currentTab, setCurrentTab] = useState('Images');

  return (
    <VStack space={4} p={4}>
      <Header />
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {currentTab === 'Images' && <ImagesList />}
      {currentTab === 'Videos' && <VideosList />}
    </VStack>
  );
};

export default Gallery;
