import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking, Alert,PixelRatio } from 'react-native';
import callIcon from '../assets/callIcon.png'; // Update the path as necessary
import config from '../../config'; // Update the path as necessary
import watsappIcon from '../assets/watsappIcon.png';


const openWhatsApp = (number) => {
    const url = `whatsapp://send?phone=${number}`;
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert('WhatsApp is not installed on your device');
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

const WhatsappComponent = ({watsappNo}) => {
    return (
        <TouchableOpacity style={styles.carContainer} onPress={() => openWhatsApp(watsappNo)}>
            <Image source={watsappIcon} style={styles.watsappIcon} />
            <Text style={styles.clinicText}>{watsappNo}</Text>
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
    watsappIcon: {
        height: 25,
        width: 25,
        position:'absolute',
        left:8,
        top:8,
    },
    clinicText: {
        color: config.secondaryColor,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
});

export default WhatsappComponent;
