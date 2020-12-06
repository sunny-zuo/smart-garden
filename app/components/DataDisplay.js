import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { white, darkGreen3 } from "./Colors";

export default function DataDisplay(props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.icon}  {props.type.toUpperCase()}</Text>
            <Text style={styles.value}>{props.value}<Text style={styles.unit}> {props.unit} </Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingBottom: 6
    },
    title: {
        color: '#757575'
    },
    value: {
        color: '#000000',
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 16
    },
    unit: {
        fontSize: 16
    }
});