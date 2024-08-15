import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import Modal from "react-native-modal";
import config from '../../config.mjs';
import { useNavigation } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

const ImgaeLogo = ({ imageURI,name,healthInfo }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(imageURI);
    // const [healthInfo , setHealthInfo ] = useState(false);
    useEffect(() => {
        setImage(imageURI);
    }, [imageURI])

    const props = {
        activeStrokeWidth: 10,
        inActiveStrokeWidth: 10,
        inActiveStrokeOpacity: 0.2
    };

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileAndHealth',{imageURI: image,name:name, healthInfo: healthInfo})} style={styles.profileButton}>
                <Image source={image ? { uri: image } : profileIcon} style={styles.profilelogo} />
                <View style={{ position: 'absolute' }}>
                    <CircularProgressBase
                        {...props}
                        value={healthInfo === false ? 30 : 100}
                        radius={26}
                        activeStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                        inActiveStrokeColor={healthInfo === false ? '#fd5c63' : '#54B435'}
                    />
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    profileButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilelogo: {
        width: 40,
        height: 40,
        borderRadius: 29,
    },
});

export default ImgaeLogo;
