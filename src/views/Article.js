import {ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import Header from '../components/Header';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';

const Article = props => {
  const {article} = props.route.params;

  const navigation = useNavigation();
  console.log(JSON.stringify(navigation.getState(), 0, 2));

  const source = {
    html: `
      <div style="color:#000;">
        <img src="${article.thumbnail}" alt="${article.title}" />
        ${article.content}
      </div>
    `,
  };

  return (
    <VStack space={4} p={4}>
      <Header />
      <Text fontSize="4xl" fontWeight="bold" lineHeight="xs">
        {article.title}
      </Text>
      <ScrollView>
        <RenderHtml source={source} contentWidth={200} />
      </ScrollView>
    </VStack>
  );
};

export default Article;
