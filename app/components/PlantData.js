import React from 'react';
import ProgressCircle from 'react-native-progress-circle'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import DataDisplay from './DataDisplay';
import { darkGreen1, darkGreen2, white } from './Colors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlantData() {
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

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Garlic Plant</Text>
            <View style={styles.majorDataView}>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <View>
                        <ProgressCircle percent={86} radius={50} borderWidth={4} color={darkGreen1} shadowColor={"#CDCDCD"} bgColor={white}>
                            <Text style={{ color: darkGreen1 }}>
                                <Text style={{ fontSize: 30 }}>{'86'}</Text><Text style={{ fontSize: 14 }}>%</Text>
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
                    <DataDisplay icon={<FontAwesome5 name="ruler-vertical" size={16} color={'#000000'}/>} type={'Height'} value={'0.324'} unit={'m'}/>
                    <DataDisplay icon={<FontAwesome5 name="thermometer-quarter" size={16} color={'#D50000'} />} type={'Temperature'} value={'23'} unit={'°C'} />
                    <DataDisplay icon={<FontAwesome5 name="tint" size={16} color={'#03A9F4'} />} type={'Moisture'} value={'85'} unit={'%'} />
                    <DataDisplay icon={<FontAwesome5 name="lightbulb" size={16} color={'#FBC02D'} />} type={'Light'} value={'69'} unit={'%'} />
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