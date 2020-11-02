import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {darkGreen2} from "./Colors";

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
        backgroundColor: darkGreen2
    },
    text: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    },
});

export default Header;