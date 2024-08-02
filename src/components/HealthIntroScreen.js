import React from 'react';
import { Image, View, StyleSheet, Text, PixelRatio } from 'react-native';
import config from '../../config';
import HealthInfo from '../assets/healthInfo.png';

const HealthIntroScreen = () => {
    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>Control your Health</Text>
            <Image source={HealthInfo} style={styles.image} />
            <Text style={styles.text}>
                Provide access to your health and physical activity data so your doctor can better understand your routine.
            </Text>
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
        width: 210,
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

export default HealthIntroScreen;
