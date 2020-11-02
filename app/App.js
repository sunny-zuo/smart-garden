import React, { useState, useEffect, props } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Header from './components/Header';
import {lightGreen1, lightGreen2, lightGreen3, darkGreen1, darkGreen2} from "./components/Colors";
import {
  LineChart,
} from "react-native-chart-kit";
import GraphHeader from './components/GraphHeader';


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
          console.log(logs);
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
    console.log(date);
    console.log(hour);
    console.log(minutes);
    return `${hour}:${minutes}`;
  }

  useEffect(() => {
    getAllLogs();
	}, []);

  if (logs == null) {
    return null;
  }

  return (
  
    <View style={styles.container}>
      <Header />
      <GraphHeader title = 'Moisture over time: '/>
      <LineChart
        data={{
          labels: logs.map(log => 
            {const date = formatDate(log.datetime);
              return date;})
            .slice(-5),
          datasets: [
            {
              data: logs.map(log => log.moisture*100).slice(-5)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <GraphHeader title = 'Light over time: '/>
      <LineChart
        data={{
          labels: logs.map(log => 
            {const date = formatDate(log.datetime);
            return date;})
            .slice(-5),
          datasets: [
            {
              data: logs.map(log => log.brightness).slice(-5)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: darkGreen2
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
