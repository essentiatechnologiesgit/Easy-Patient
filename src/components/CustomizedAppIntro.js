import React, { useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, PixelRatio } from 'react-native';
import config from '../../config.mjs';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SelfieMan from '../assets/selfieMan.png';
import CustomButton from './CustomizedButton';


const CustomizedAppIntro = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>Customize your app</Text>
            <Image source={SelfieMan} style={styles.image} />
            <Text style={styles.text}>Provide access to your camera services and image files for a personalized experience</Text>
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
        width: 200,
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

export default CustomizedAppIntro;
