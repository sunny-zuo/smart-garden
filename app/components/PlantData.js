import React, {useState, useEffect} from 'react';
import ProgressCircle from 'react-native-progress-circle'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import DataDisplay from './DataDisplay';
import { darkGreen1, darkGreen2, white } from './Colors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlantData() {
    const [logs, setLogs] = useState();
    const [lastLog, setLastLog] = useState();

    useEffect(() => {
        getAllLogs();
    }, []);

    const waterPlant = () => {
        const url = `http://10.0.0.11:5000/api/controls/water`;
        try {
            fetch(url, { method: "POST", })
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
            fetch(url, { method: "POST", })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })
        } catch (error) {
            console.log(error);
        }
    }
    
    const getAllLogs = async () => {
        const url = "http://159.203.41.214:5000/api/logs";
        try {
            fetch(url, { method: "GET", })
                .then((response) => response.json())
                .then((logs) => {
                    setLogs(logs);
                    setLastLog(logs.slice(-1)[0]);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // function that returns a health percentage from a given log. Fairly simple at the moment.
    const calculateHealth = (log) => {
        const tempPercent = (15 <= log.temperature && log.temperature <= 30) ? 1 : 1 / Math.abs(log.temperature - 22) * 7;
        const moisturePercent = log.moisture;
        return (tempPercent + moisturePercent * 2) * 100 / 3;
    }

    if (!logs || !lastLog) {
        return null;
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Garlic Plant</Text>
            <View style={styles.majorDataView}>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <View>
                        <ProgressCircle percent={calculateHealth(lastLog).toFixed(0)} radius={50} borderWidth={4} color={darkGreen1} shadowColor={"#CDCDCD"} bgColor={white}>
                            <Text style={{ color: darkGreen1 }}>
                                <Text style={{ fontSize: 30 }}>{calculateHealth(lastLog).toFixed(0)}</Text><Text style={{ fontSize: 14 }}>%</Text>
                            </Text>
                            <Text style={{ color: darkGreen1, fontSize: 10 }}>
                                HEALTH
                        </Text>
                        </ProgressCircle>
                    </View>
                    <View style={{ paddingTop: 32 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => waterPlant()}
                        >
                            <Text style={{ color: white }}><FontAwesome5 name="tint" size={16} color={white} /> Water Plant</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 12 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => takePicture()}
                        >
                            <Text style={{ color: white }}><FontAwesome5 name="camera" size={16} color={white} /> Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.5, paddingLeft: 40 }}>
                    <DataDisplay icon={<FontAwesome5 name="ruler-vertical" size={16} color={'#000000'} />} type={'Height'} value={(lastLog.height * 100).toFixed(1)} unit={'m'}/>
                    <DataDisplay icon={<FontAwesome5 name="thermometer-quarter" size={16} color={'#D50000'} />} type={'Temperature'} value={lastLog.temperature.toFixed(1)} unit={'°C'} />
                    <DataDisplay icon={<FontAwesome5 name="tint" size={16} color={'#03A9F4'} />} type={'Moisture'} value={(lastLog.moisture * 100).toFixed(1)} unit={'%'} />
                    <DataDisplay icon={<FontAwesome5 name="lightbulb" size={16} color={'#FBC02D'} />} type={'Light'} value={(lastLog.brightness * 100).toFixed(1)} unit={'%'} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 0,
        padding: 10,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: white,
        position: 'relative',
        marginTop: 330,
        zIndex: 10,
        flex: 1
    },
    title: {
        color: '#000000',
        fontSize: 26,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingLeft: 14,
        paddingTop: 4,
    },
    majorDataView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    button: {
        backgroundColor: '#0277BD',
        alignItems: 'center',
        padding: 10,
        borderRadius: 16,
        width: 120
    }
});