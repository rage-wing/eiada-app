import {Text, VStack} from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import ArticlesList from '../../containers/doctor/ArticlesList';

const Articles = props => {
  return (
    <VStack space={4} p={4}>
      <Header />
      <Text fontSize={24} fontWeight="bold">
        Articles
      </Text>
      <ArticlesList />
    </VStack>
  );
};

export default Articles;
