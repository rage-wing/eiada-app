import {useNavigation} from '@react-navigation/native';
import {Button, HStack, Text, VStack} from 'native-base';
import React from 'react';
import Header from '../../components/Header';
import ArticlesList from '../../containers/doctor/ArticlesList';

const Articles = props => {
  const navigation = useNavigation();

  const onCreateArticle = () => {
    navigation.navigate('CreateArticle');
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <HStack justifyContent="space-between">
        <Text fontSize={24} fontWeight="bold">
          Articles
        </Text>
        <Button onPress={onCreateArticle}>Create Article</Button>
      </HStack>
      <ArticlesList />
    </VStack>
  );
};

export default Articles;
