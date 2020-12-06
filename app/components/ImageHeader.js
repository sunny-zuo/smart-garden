import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageHeader = () => {
    return (
        <View>
            {/* We add a Math.random() to the end of the uri as a query string to change the URL and force react native to reload the image instead of caching. 
                See https://github.com/facebook/react-native/issues/12606 */}
            <Image style={styles.image} source={{ uri: 'http://159.203.41.214:5000/api/image/latest' + '?'+ Math.random() }} />
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