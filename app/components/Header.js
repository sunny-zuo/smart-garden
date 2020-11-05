import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {lightGreen1, darkGreen2} from "./Colors";

const Header = () => {
    return (
        <View style = {styles.header}>
            <Text style={styles.text}>Epic Plant Project</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 15,
        backgroundColor: lightGreen1
    },
    text: {
        color: '#000000',
        fontSize: 23,
        textAlign: 'center',
    },
});

export default Header;