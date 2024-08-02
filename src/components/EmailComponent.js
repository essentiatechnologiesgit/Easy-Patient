import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking, Alert, PixelRatio } from 'react-native';
import GoldEmailIcon from '../assets/goldEmailIcon.png'; // Update the path as necessary
import config from '../../config';


const openEmailClient = (email) => {
    const url = `mailto:${email}`;
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert('Email client is not available on your device');
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

const EmailComponent = ({email}) => {
    return (
        <TouchableOpacity style={styles.carContainer} onPress={() => openEmailClient(email)}>
            <Image source={GoldEmailIcon} style={styles.emailIcon} />
            <Text style={styles.clinicText}>{email}</Text>
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
    emailIcon: {
        width: 28,
        height: 20,
        position:'absolute',
        left:8,
        top:12,
    },
    clinicText: {
        color: config.secondaryColor,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
});

export default EmailComponent;
