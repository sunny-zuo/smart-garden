import React, { useState, useEffect, props } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export default function App() {
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

  useEffect(() => {
		getAllLogs();
	});

	return (
		<View>
      <Header />
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});
