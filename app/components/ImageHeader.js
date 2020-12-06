import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageHeader = () => {
    return (
        <View>
            <Image style={styles.image} source={{ uri: 'http://159.203.41.214:5000/api/image/latest' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'cover',
        position: 'absolute'
    }
});

export default ImageHeader;