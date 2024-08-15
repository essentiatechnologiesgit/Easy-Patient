import React, { useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, PixelRatio } from 'react-native';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import IntroBell from '../assets/IntroBell.png';
import CustomButton from './CustomizedButton';


const BellIntro = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>Dont miss a notification</Text>
            <Image source={IntroBell} style={styles.image} />
            <Text style={styles.text}>Provide access to your notification services for notifications for medications and appointments</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
    },
    heading: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 25,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center',
        marginTop: -40,
    },
    image: {
        // marginTop:100,
        width: 220,
        height: 200,

    },
    text: {
        color: config.textColorHeadings,
        width: '50%',
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 16,
        fontFamily:config.fontStyle,
    }
});

export default BellIntro;
