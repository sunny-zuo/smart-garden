import React, { useState, useEffect, props } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import Header from './components/Header';
import {lightGreen1, lightGreen2, lightGreen3, darkGreen1, darkGreen2} from "./components/Colors";
import {
  LineChart,
} from "react-native-chart-kit";
import GraphHeader from './components/GraphHeader';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { height } = Dimensions.get("window");

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
  const waterPlant = () => {
    const url = `http://10.0.0.11:5000/api/controls/water`;
		try {
      fetch(url, {method: "POST",})
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
		} catch (error) {
			console.log(error);
		}
  }
  const takePicture = () => {
    const url = `http://10.0.0.11:5000/api/image/take-picture`;
		try {
      fetch(url, {method: "POST",})
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
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
      <Header />
      <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 100, marginRight: 100, height: 10}}>
        <Button
          onPress={() => waterPlant()}
          title="Water Plant"/>
      </View>
      
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
        fromZero={true}
        chartConfig={{
          backgroundColor: lightGreen1,
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: lightGreen1,
          backgroundGradientTo: lightGreen1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4.5",
            strokeWidth: "2",
            stroke: darkGreen2
          }
        }}
        bezier
        style={{
          marginVertical: 5,
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
        fromZero={true}
        chartConfig={{
          backgroundColor: lightGreen1,
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: lightGreen1,
          backgroundGradientTo: lightGreen1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4.5",
            strokeWidth: "2",
            stroke: darkGreen2
          }
        }}
        bezier
        style={{
          marginVertical: 5,
          borderRadius: 16
        }}
      />
      <GraphHeader title = 'Humidity over time: '/>
      <LineChart
        data={{
          labels: logs.map(log =>
            {const date = formatDate(log.datetime);
              return date;})
            .slice(-5),
          datasets: [
            {
              data: logs.map(log => log.humidity).slice(-5)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true}
        chartConfig={{
          backgroundColor: lightGreen1,
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: lightGreen1,
          backgroundGradientTo: lightGreen1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4.5",
            strokeWidth: "2",
            stroke: darkGreen2
          }
        }}
        bezier
        style={{
          marginVertical: 5,
          borderRadius: 16
        }}
      />
      <GraphHeader title = 'Temperature over time: '/>
      <LineChart
        data={{
          labels: logs.map(log =>
            {const date = formatDate(log.datetime);
              return date;})
            .slice(-5),
          datasets: [
            {
              data: logs.map(log => log.temperature).slice(-5)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="°"
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true}
        chartConfig={{
          backgroundColor: lightGreen1,
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: lightGreen1,
          backgroundGradientTo: lightGreen1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4.5",
            strokeWidth: "2",
            stroke: darkGreen2
          }
        }}
        bezier
        style={{
          marginVertical: 5,
          borderRadius: 16
        }}
      />
      </ScrollView>
    </SafeAreaView>
  );
}

function HeightScreen() {
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
  const takePicture = () => {
    const url = `http://10.0.0.11:5000/api/image/take-picture`;
		try {
      fetch(url, {method: "POST",})
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
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
      <Header />
      <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 100, marginRight: 100, height: 10}}>
        <Button
          onPress={() => takePicture()}
          title="Take Picture"/>
      </View>
      <View style={{ alignItems: 'center', height: 300 }}>
          <Image source={{ uri: 'http://159.203.41.214:5000/api/image/latest' }} style={{ width: '90%', height: undefined, aspectRatio: 1, resizeMode: 'contain', borderRadius: 10}}></Image>
      </View>
      <GraphHeader title = 'Height over time: '/>
      <LineChart
        data={{
          labels: logs.map(log =>
            {const date = formatDate(log.datetime);
            return date;})
            .slice(-5),
          datasets: [
            {
              data: logs.map(log => log.height).slice(-5)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix="cm"
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true}
        chartConfig={{
          backgroundColor: lightGreen1,
          backgroundGradientToOpacity: 0.4,
          backgroundGradientFromOpacity: 0.4,
          backgroundGradientFrom: lightGreen1,
          backgroundGradientTo: lightGreen1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4.5",
            strokeWidth: "2",
            stroke: darkGreen2
          }
        }}
        bezier
        style={{
          marginVertical: 5,
          borderRadius: 16
        }}
      />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Height Data" component={HeightScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: darkGreen2
  },
  scrollView: {
    backgroundColor: darkGreen2
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
