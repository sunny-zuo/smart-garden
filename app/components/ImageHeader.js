import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImageHeader() {
    const [image, setImage] = useState('http://159.203.41.214:5000/api/image/latest');
    return (
        <View>
            {/* We add a Math.random() to the end of the uri as a query string to change the URL and force react native to reload the image instead of caching. 
                See https://github.com/facebook/react-native/issues/12606 */}
            {/*<Image style={styles.image} source={{ uri: 'http://159.203.41.214:5000/api/image/latest' + '?'+ Math.random() }} />*/}
            <Image style={styles.image} source={{ uri: image}} />
            <Text style={styles.refreshBtnLeft}>
                <Ionicons name="md-refresh-circle" size={50} color="#ffffff" onPress={() => setImage(`http://159.203.41.214:5000/api/image/latest?${Math.random()}`)} />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: undefined,
        height: 400,
        aspectRatio: 1,
        resizeMode: 'cover',
        position: 'absolute'
    },
    refreshBtnLeft: {
        position: 'absolute',
        marginTop: 270,
        right: 10
    },
});