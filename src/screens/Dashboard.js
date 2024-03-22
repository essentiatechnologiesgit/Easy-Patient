import React, { useState, useRef, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import Medications from '../components/Medications';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BellAlarm from '../components/BellAlarm';
import CrossAlarm from '../components/CrossAlarm';
import CrossBell from '../components/CrossBell';
import SuccessAlarm from '../components/SuccessAlarm';
import Schedule from '../components/Schedule';
import Notifications from '../components/Notifications';
import axios from 'axios';
const Dashboard = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [access_token, setAccessToken] = useState('');
    const [startTime, setStartTime ] =useState('');
    const [ frequency , setFrequency] = useState('');
    
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
        getAccessToken();
        getMedicinesAndSupplenets();
    }, []);

    const getAccessToken = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        setAccessToken(responseObject.access_token);
    }

    const getMedicinesAndSupplenets = () => { 
        if (access_token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api-patient-dev.easy-health.app/medicines',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            };
            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setStartTime(response.data[0].start_time);
                    setFrequency(response.data[0].frequency);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        getLoginResponse();
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            getMedicinesAndSupplenets()
        }, 2000);
    }, []);

    const responseData = "2024-03-22 15:06:00"; 

    const responseDate = new Date(responseData);
    const currentDate = new Date();
    const isToday = responseDate.toDateString() === currentDate.toDateString();
    
    let dataArray = [];

    if (isToday) {
        const responseHour = responseDate.getHours();
        const responseMinute = responseDate.getMinutes();   
        const staticHour = responseHour;
        const staticMinute = responseMinute;
        const intervalHours = frequency; 
        dataArray = [{ time: `${staticHour}:${staticMinute.toString().padStart(2, '0')}` }];
        const endHour = 24; // End hour of the day

        for (let i = 1; ; i++) {
            const newHour = staticHour + Math.floor((staticMinute + i * intervalHours * 60) / 60);
            const newMinute = (staticMinute + i * intervalHours * 60) % 60;
            
            if (newHour >= endHour) {
                break; // Exit the loop if it does
            }
        
            dataArray.push({ time: `${newHour}:${newMinute.toString().padStart(2, '0')}` });
        }
    }

    let lastComponentType = null;


    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
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
                    <View style={[styles.component]}>
                        <Notifications />
                    </View>
                    <View style={styles.sliderContainer}>
                        <FolderSlider />
                    </View>
                    {/* <View style={[styles.component]}>
                        <Medications />
                    </View> */}
                    
                    {dataArray.map((item, index) => {
                    const currentDate = new Date();
                    const itemHour = parseInt(item.time.split(':')[0]); 
                    const itemMinute = parseInt(item.time.split(':')[1]); 
                    const itemTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), itemHour, itemMinute);
                    const isPast = currentDate > itemTime;

                    let componentToRender;
                    if (lastComponentType === 'CrossAlarm' && !isPast) {
                        componentToRender = <CrossBell time={item.time} prescriptionText={'Take 1 pill in 1 minute'} />;
                        lastComponentType = 'CrossBell';
                    } else {
                        componentToRender = isPast ? <CrossAlarm time={item.time} /> : <BellAlarm time={item.time} />;
                        lastComponentType = isPast ? 'CrossAlarm' : 'BellAlarm';
                    }
                    
                    return (
                        <View style={[styles.component]} key={index}>
                            {componentToRender}
                        </View>
                    );
                })}




                    {/* <View style={[styles.component]}>
                        <BellAlarm time={'21:06'} />
                    </View>
                    <View style={[styles.component]}>
                        <CrossAlarm time={'11:06'} />
                    </View>
                    <View style={[styles.component]}>
                        <CrossBell time={'05:06'} prescriptionText={'Take 1 pill in 1 minute'} />
                    </View>
                    <View style={[styles.component]}>
                        <SuccessAlarm time={'22:06'} />
                    </View> */}
                    {/* <View style={[styles.component]}>
                        <Schedule />
                    </View> */}
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
        marginTop: '6%',
    },
    component: {
        marginBottom: 8,
    },
    sliderContainer: {
        minHeight: 170,
        marginLeft: 16,
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
