import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { white, darkGreen3 } from "./Colors";

const PlantCard = () => {
    return (
        <View style={styles.card}>
            <Image source={require('../assets/plant1.jpg')} style={styles.thumbnail} />
            <View style={styles.topContainer}>
                <Text style={styles.title}>Onion Plant</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: darkGreen3,
        margin: 20,
        padding: 10,
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        backgroundColor: darkGreen3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        flex: 1,
    },
    title: {
        color: white,
        fontSize: 22,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    thumbnail: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
});

export default PlantCard;