import React from 'react';
import ProgressCircle from 'react-native-progress-circle'
import { Text, View, Image, StyleSheet } from 'react-native';
import { darkGreen1, white } from './Colors';

const PlantData = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Garlic Plant</Text>
            <View style={styles.majorDataView}>
                <View style={{ flex: 0.35, alignItems: 'center' }}>
                    <ProgressCircle percent={30} radius={50} borderWidth={4} color={darkGreen1} shadowColor={"#CDCDCD"} bgColor={white}>
                        <Text style={{ color: darkGreen1 }}>
                            <Text style={{ fontSize: 30 }}>{'30'}</Text><Text style={{ fontSize: 14 }}>%</Text>
                        </Text>
                        <Text style={{ color: darkGreen1, fontSize: 10 }}>
                            HEALTH
                        </Text>
                    </ProgressCircle>
                </View>
                <View style={{ flex: 0.65 }}>

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
        paddingLeft: 10,
        paddingTop: 4,
    },
    majorDataView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    }
});

export default PlantData;