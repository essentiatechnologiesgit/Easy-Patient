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
import BellAlarm from '../components/BellAlarm';
import CrossAlarm from '../components/CrossAlarm';
import CrossBell from '../components/CrossBell';
const Dashboard = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const getLoginResponse = async () => {
        try {
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            if (loginResponse !== null) {
                const responseObject = JSON.parse(loginResponse);
                setName(responseObject.user.full_name);
            } else {
                console.log('No loginResponse found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving loginResponse from AsyncStorage:', error);
        }
    }
    handleLogout = () => {
        navigation.navigate('Login');
    }

    handleProfilePress = () => {
        navigation.navigate('Profile');
    }

    useEffect(() => {
        getLoginResponse();
    }, [])

    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            <ScrollView>
                <View style={styles.HeaderContainer}>
                    <Image source={config.logo} style={styles.logo}></Image>
                    <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
                        <Image source={profileIcon} style={styles.Profilelogo} />
                    </TouchableOpacity>
                </View>

                <View style={styles.NameContainer}>
                    <Text style={styles.nameHeading}>Hello {name}!</Text>
                    <Text style={styles.nameSideHeading}>Welcome to Easy Patient</Text>
                </View>
                <View style={styles.parentView}>
                    <View style={styles.sliderContainer}>
                        <FolderSlider />
                    </View>
                    <View style={[styles.component]}>
                        <Medications />
                    </View>
                    <View style={[styles.component]}>
                        <BellAlarm />
                    </View>
                    <View style={[styles.component]}>
                        <CrossAlarm />
                    </View>
                    <View style={[styles.component]}>
                        <CrossBell />
                    </View>
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
    parentView: {
        marginBottom:50,
        marginTop: '6%',
    },
    component:{
        marginBottom:8,
    },
    BellAlarm: {
        // marginLeft:16,
    },
    sliderContainer: {
        minHeight: 170,
        marginLeft: 16,
    },
    medicationContainer: {
        // alignItems:'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    profileButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NameContainer: {
        marginLeft: 16,
    },
    nameHeading: {
        fontWeight: '500',
        fontSize: PixelRatio.getFontScale() * 24,
        color: config.textColorHeadings,
    },
    logo: {
        width: '10%',
        resizeMode: 'contain',
    },
    Profilelogo: {
        width: '100%',
        height: '70%',
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
        fontSize: PixelRatio.getFontScale() * 20,
        color: config.textColorHeadings,
    },
});

export default Dashboard;
