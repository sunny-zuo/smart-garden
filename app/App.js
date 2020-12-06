import React, { useState, useEffect, props } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import ImageHeader from './components/ImageHeader';
import PlantData from './components/PlantData';
import {lightGreen1, lightGreen2, lightGreen3, darkGreen1, darkGreen2, white} from "./components/Colors";

function HomeScreen() {
  const [logs, setLogs] = useState();

  const getAllLogs = async() => {
    const url = "http://159.203.41.214:5000/api/logs";
		try {
      fetch(url, {method: "GET",})
        .then((response) => response.json())
        .then((logs) => {
          setLogs(logs)
        })
		} catch (error) {
			console.log(error);
		}
  }
  const getRangeLogs = async(start, end) => {
    const url = `http://159.203.41.214:5000/api/logs/range/${start}/${end}`;
		try {
      fetch(url, {method: "GET",})
        .then((response) => response.json())
        .then((logs) => {
          setLogs(logs)
        })
		} catch (error) {
			console.log(error);
		}
  }
  const getOneLog = async(date) => {
    const url = `http://159.203.41.214:5000/api/logs/${date}`;
		try {
      fetch(url, {method: "GET",})
        .then((response) => response.json())
        .then((logs) => {
          setLogs(logs)
        })
		} catch (error) {
			console.log(error);
		}
  }

  const formatDate = date => {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hour}:${minutes}`;
  }

  useEffect(() => {
    getAllLogs();
	}, []);

  if (logs == null) {
    return null;
  }

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView style={styles.scrollView}>
        <ImageHeader/>
        <PlantData />
      </ScrollView>
    </SafeAreaView>
  );
}

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
