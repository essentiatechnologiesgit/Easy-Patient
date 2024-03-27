import React, { useEffect, useState } from 'react';
import { View, Text,Image, ActivityIndicator, StyleSheet, TouchableOpacity,PixelRatio } from 'react-native';
import Modal from "react-native-modal";
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
const ImgaeLogo = ({imageURI}) => {
    const navigation = useNavigation();
    const [image , setImage] = useState(imageURI);
    
    useEffect(()=>{
        setImage(imageURI);
    },[imageURI])
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
            <Image source={image ? { uri: image } : profileIcon} style={styles.profilelogo} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    profileButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilelogo: {
        width: '70%',
        height: '70%',
        borderRadius: 20,
    },
});

export default ImgaeLogo;
