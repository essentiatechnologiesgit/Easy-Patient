import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking, PixelRatio } from 'react-native';
import callIcon from '../assets/callIcon.png'; // Update the path as necessary
import config from '../../config.mjs'; // Update the path as necessary



const openDialer = (number) => {
    Linking.openURL(`tel:${number}`);
};

const CallComponent = ({phone}) => {
    return (
        <TouchableOpacity style={styles.carContainer} onPress={() => openDialer(phone)}>
            <Image source={callIcon} style={styles.callIcon} />
            <Text style={styles.clinicText}>{phone}</Text>
            <Text></Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    carContainer: {
        marginTop: 10,
        borderColor: config.secondaryColor,
        borderWidth: 2,
        borderRadius: 6,
        flexDirection: 'row',
        padding: 10,
        justifyContent:'center',
    },
    callIcon: {
        height: 28,
        width: 26,
        position:'absolute',
        left:8,
        top:8,
    },
    clinicText: {
        color: config.secondaryColor,
        // marginLeft: '28%',
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
});

export default CallComponent;
