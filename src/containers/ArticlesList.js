import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import articleService from '../services/article';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const ArticlesList = props => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getArticles = async () => {
    setLoading(true);
    const {payload} = await articleService.getAll();
    setArticles(payload.docs);
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const onPress = article => {
    navigation.navigate('Article', {article});
  };

  return (
    <ScrollView>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <VStack pb={32}>
          {articles.map((article, idx) => (
            <Pressable key={article._id} onPress={() => onPress(article)}>
              <Box m={2} p={2} rounded="md" bgColor="gray.100">
                <VStack space={2}>
                  <Text color="gray.400">
                    {moment(article.createdAt).format('MMMM Do YYYY')}
                  </Text>
                  <Text fontSize="2xl" fontWeight="black" lineHeight="xs">
                    {article.title}
                  </Text>
                  <Image
                    rounded="md"
                    source={{uri: article.thumbnail}}
                    alt={article.title}
                    height="150"
                  />
                </VStack>
              </Box>
            </Pressable>
          ))}
        </VStack>
      )}
    </ScrollView>
  );
};

export default ArticlesList;
