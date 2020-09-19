import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';

import {
  useFonts,
  Play_400Regular,
  Play_700Bold
} from '@expo-google-fonts/play';

import Header from './src/components/Header';
import Homr from './src/Pages/Home';

export default function App() {
  const [fontsLoad] = useFonts( {
    Play_400Regular,
    Play_700Bold
  });

  if(!fontsLoad){
    return <AppLoading />
  } else{
    return (
    <View style={styles.container}>
      <Header />
      <Homr />
      <StatusBar style="auto" />
    </View>
  );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F34'
  },
});
