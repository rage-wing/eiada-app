import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Field from '../../components/elements/Field';
import Header from '../../components/Header';
import articleService from '../../services/article';

const EditArticle = props => {
  const article = props.route.params.article;
  const richText = useRef();
  let contentRef = useRef(article.content);
  const [title, setTitle] = useState(article.title);
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState(article.thumbnail);
  const navigation = useNavigation();

  const changeThumbnail = useCallback(async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
    });
    const file = result.assets[0];
    console.log(file.uri);
    setThumbnailUrl(file.uri);
    setThumbnail(file.base64);
  }, []);

  let handleChange = useCallback(html => {
    contentRef.current = html;
  }, []);

  const save = useCallback(async () => {
    try {
      let payload = {
        title,
        content: contentRef.current,
      };
      if (thumbnail) {
        payload.thumbnail = thumbnail;
      }
      await articleService.edit(article._id, payload);
      navigation.navigate('Articles');
    } catch (error) {
      console.log(error.message);
    }
  }, [article._id, navigation, thumbnail, title]);

  return (
    <VStack space={4} p={4}>
      <Header />
      <ScrollView>
        <VStack pb={32} space={4}>
          <Field
            label="title"
            placeholder="Enter new title..."
            fontSize="2xl"
            fontWeight="bold"
            value={title}
            onChangeText={setTitle}
          />
          <Pressable onPress={changeThumbnail}>
            <Box
              bgColor="#0000002f"
              position="absolute"
              zIndex={10}
              w="full"
              h="full">
              <Text m="auto" color="white">
                Change Thumbnail
              </Text>
            </Box>
            <Image
              rounded="md"
              source={{
                uri: thumbnailUrl,
                cache: 'reload',
              }}
              height="150"
            />
          </Pressable>
          <RichToolbar
            editor={richText}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#bfbfbf'}
          />

          <RichEditor
            ref={richText}
            useContainer={true}
            initialHeight={400}
            enterKeyHint={'done'}
            placeholder={'please input content'}
            initialContentHTML={article.content}
            editorInitializedCallback={() => console.log('Initialized editor')}
            onChange={handleChange}
            onHeightChange={x => console.log('on height change', x)}
            onPaste={x => console.log('handlePaste', x)}
            onKeyUp={x => console.log('handleKeyUp', x)}
            onKeyDown={x => console.log('handleKeyDown', x)}
            onInput={x => console.log('handleInput', x)}
            onMessage={x => console.log('handleMessage', x)}
            onFocus={x => console.log('handleFocus', x)}
            onBlur={x => console.log('handleBlur', x)}
            onCursorPosition={x => console.log('handleCursorPosition', x)}
            pasteAsPlainText={true}
          />
          <Button colorScheme="primary" onPress={save}>
            save
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default EditArticle;
