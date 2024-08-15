import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config.mjs';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
const SuccessAlarm = ({time}) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Svg width="23" height="22" viewBox="0 0 24 24">
                    <Path fill="green" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                </Svg>      
                <Text style={styles.text}>{time} - Alarm </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 40,
        padding: 10,
        alignSelf: 'center',
    },
    text: {
        marginLeft: 8,
        color: 'black',
    },
    bell: {
        height: 20,
        width: 20,
    }
});

export default SuccessAlarm;
