import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Touchable, ScrollView, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import Medications from '../components/Medications';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BackHeader from '../components/backHeader';

const Profile = () => {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Profile"} />
                <Image source={profileIcon} style={styles.Profilelogo} /> 
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,
        alignItems:'center',
    },
    Profilelogo:{

    },
});

export default Profile;
