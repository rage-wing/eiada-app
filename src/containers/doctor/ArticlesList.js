import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import articleService from '../../services/article';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Alert from '../../components/elements/Alert';
import {RefreshControl} from 'react-native';

const ArticlesList = props => {
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentArticleIdx, setCurrentArticleIdx] = useState();
  const [deleteArticleModalOpen, setDeleteArticleModalOpen] = useState(false);

  const navigation = useNavigation();

  const getArticles = useCallback(async () => {
    const {payload} = await articleService.getAll();
    setArticles(payload.docs);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getArticles();
    setRefreshing(false);
  }, [getArticles]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const onPress = article => {
    navigation.navigate('Article', {article});
  };

  const onEdit = article => {
    navigation.navigate('EditArticle', {article});
  };

  const remove = async idx => {
    try {
      const arr = [...articles];
      await articleService.remove(articles[idx]._id);
      arr.splice(idx, 1);
      setArticles(arr);
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
          isOpen={deleteArticleModalOpen}
          setIsOpen={setDeleteArticleModalOpen}
          title="delete image"
          body="are you sure you want to delete this image"
          onConfirm={() => remove(currentArticleIdx)}
        />
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
                  alt={article.thumbnail}
                  height="150"
                />
                <HStack space={2}>
                  <Button
                    w="1/2"
                    colorScheme="primary"
                    onPress={() => onEdit(article)}>
                    Edit
                  </Button>
                  <Button
                    w="1/2"
                    colorScheme="danger"
                    onPress={() => {
                      setCurrentArticleIdx(idx);
                      setDeleteArticleModalOpen(true);
                    }}>
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default ArticlesList;
