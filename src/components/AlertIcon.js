import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio } from 'react-native';


const AlertIcon = ({ msg }) => {
    return (
        <View style={styles.imageContainer}>
            <Image
                source={require('../assets/mark.png')}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    imageContainer: {
        alignItems: 'flex-end',
        top: -26,
        right:4,
        height: 0,
    },
    image: {
        height: 20,
        width: 20,
    },
});

export default AlertIcon;
