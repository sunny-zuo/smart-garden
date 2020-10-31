import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GraphHeader = (props) => {
   const styles = StyleSheet.create({
    graphHeader: {
        height: 60,
        padding: 15,
        backgroundColor: props.setColor
    },
    graphHeaderText: {
        color: '#fff',
        fontSize: 23,
        textAlign: 'center',
    },
});
   
    return (
        <View style = {styles.graphHeader}>
            <Text style={styles.graphHeaderText}> {props.title} </Text>
        </View>
    );
};





export default GraphHeader;