import React from 'react';
import ProgressCircle from 'react-native-progress-circle'
import { Text, View, Image, StyleSheet } from 'react-native';
import DataDisplay from './DataDisplay';
import { darkGreen1, darkGreen2, white } from './Colors';
import { FontAwesome5 } from '@expo/vector-icons';

const PlantData = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Garlic Plant</Text>
            <View style={styles.majorDataView}>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <ProgressCircle percent={86} radius={50} borderWidth={4} color={darkGreen1} shadowColor={"#CDCDCD"} bgColor={white}>
                        <Text style={{ color: darkGreen1 }}>
                            <Text style={{ fontSize: 30 }}>{'86'}</Text><Text style={{ fontSize: 14 }}>%</Text>
                        </Text>
                        <Text style={{ color: darkGreen1, fontSize: 10 }}>
                            HEALTH
                        </Text>
                    </ProgressCircle>
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
    }
});

export default PlantData;