import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import Medications from '../components/Medications';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Dashboard = () => {
    const navigation = useNavigation();
    const [name , setName] = useState('');
    const getLoginResponse = async () => {
        try {
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            if (loginResponse !== null) {
                // setName(loginResponse.user.full_name);
                const responseObject = JSON.parse(loginResponse);
                setName(responseObject.user.full_name);
            } else {
                console.log('No loginResponse found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving loginResponse from AsyncStorage:', error);
        }
    }

    useEffect(() => {
        getLoginResponse();
    }, [])

    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            <ScrollView>
                <View style={styles.HeaderContainer}>
                    <Image source={config.logo} style={styles.logo}></Image>
                    <Image source={profileIcon} style={styles.Profilelogo}></Image>
                </View>
                <View style={styles.NameContainer}>
                    <Text style={styles.nameHeading}>Hello {name}!</Text>
                    <Text style={styles.nameSideHeading}>Welcome to Easy Patient</Text>
                </View>

                <View style={styles.sliderContainer}>
                    <FolderSlider />
                </View>
                <View style={styles.medicationContainer}>
                    <Medications />
                </View>
            </ScrollView>
            <Footer />

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'top',
        alignItems: 'center',
        marginTop: '20%'
    },

    sliderContainer: {
        minHeight: 170,
        marginTop: '8%',
        marginLeft: 16,
    },
    medicationContainer: {
        marginTop: '4%',
        marginLeft: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    NameContainer: {
        marginLeft: 16,
    },
    nameHeading: {
        fontWeight: 'bold',
        fontSize: PixelRatio.getFontScale() * 26,
        color: config.textColorHeadings,
    },
    logo: {
        width: '12%',
        resizeMode: 'contain',
    },
    Profilelogo: {
        width: '10%',
        height: '60%',
        resizeMode: 'contain',
    },
    HeaderContainer: {
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameSideHeading: {
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
    },
});

export default Dashboard;
