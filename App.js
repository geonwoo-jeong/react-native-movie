import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image}from 'react-native'
import * as Font from "expo-font";
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons'

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));

const loadImages = (images) => images.map((image) =>
    typeof image === 'string'
        ? Image.prefetch(image)
        : Asset.loadAsync(image));

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
        require('./sample.jpg'),
        'https://reactnative.dev/img/oss_logo.png'
    ]);

    await Promise.all([...fonts, ...images])
  }
  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.log}/>
  }
  return <Text>AppLoading</Text>;
}

