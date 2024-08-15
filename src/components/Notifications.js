import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../../config.mjs';
import handHeart from '../assets/hand-heart.png';
const Notifications = ({ time, prescriptionText }) => {
    const navigation = useNavigation();

    return (
        <>
            <Text style={styles.heading}>Notifications</Text>
            <View style={styles.container}>
                <Image source={handHeart} style={styles.iconA}></Image>
                <Text style={styles.textA}>Dr Ahmed sent you a package or reminders.</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',
        width: '92%',
        height: 80,
        padding: 10,
        alignSelf: 'center',
    },
    iconA: {
        height: 32,
        width: 32,
        marginLeft: 0,
    },
    heading:{
        fontSize: PixelRatio.getFontScale() * 20,
        fontFamily:config.fontStyle,
        color: config.textColorHeadings,
        fontWeight:'500',
        marginLeft:16,
        marginBottom:10,
    },
    textA: {
        marginLeft: 20,
        width: '90%',
        color: '#2A2A31',
        fontSize: PixelRatio.getFontScale() * 15,
        fontFamily:config.fontStyle,
    },
    textB: {
        marginLeft: 20,
        width: '90%',
        color: '#55565C',
        fontSize: PixelRatio.getFontScale() * 14,
        fontFamily:config.fontStyle,
    },
});

export default Notifications;
