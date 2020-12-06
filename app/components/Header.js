import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {white} from "./Colors";

const Header = () => {
    return (
        <View style = {styles.header}>
            <Text style={styles.text}>My plants</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 20,
        backgroundColor: white
    },
    text: {
        color: '#000000',
        fontSize: 30,
        textAlign: 'left',
        fontWeight: "bold"
    },
});

export default Header;