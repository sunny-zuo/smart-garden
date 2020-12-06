import React, { useState, useEffect, props } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import ImageHeader from './components/ImageHeader';
import PlantData from './components/PlantData';
import {lightGreen1, lightGreen2, lightGreen3, darkGreen1, darkGreen2, white} from "./components/Colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ImageHeader />
        <PlantData />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  scrollView: {
    backgroundColor: white,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
