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
<<<<<<< HEAD
        color: '#000000',
        fontSize: 23,
=======
        color: '#fff',
        fontSize: 30,
>>>>>>> 058bfaba6112f3dd2b94af9dc9c0392dd5e7bcd2
        textAlign: 'center',
    },
});

export default Header;