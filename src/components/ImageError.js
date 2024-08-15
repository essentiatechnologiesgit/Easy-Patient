import React from 'react';
import { View, Image, StyleSheet,Text, PixelRatio } from 'react-native';
import config from '../../config.mjs';

const ImageError = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Select a Image</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'red',
        marginBottom:20,
        width:'90%',
        height:30,
        borderRadius:4,
        justifyContent:'center',
        alignSelf:'center',
        height:45,
    },
    text:{
        marginLeft:20,
        color:'white',
        fontSize: PixelRatio.getFontScale() * 16,
        fontFamily:config.fontStyle,
    },
});

export default ImageError;
