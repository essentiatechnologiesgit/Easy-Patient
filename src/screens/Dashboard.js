import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import Notifications from '../components/Notifications';
import BellAlarm from '../components/BellAlarm';
import CrossAlarm from '../components/CrossAlarm';
import CrossBell from '../components/CrossBell';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
const Dashboard = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [alarmComponents, setAlarmComponents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getLoginResponse();
            await getMedicinesAndSupplements();
        };
    
        fetchData();
    }, []);


    

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

    const getMedicinesAndSupplements = async () => {
        try {
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            const responseObject = JSON.parse(loginResponse);
            const access_token = responseObject.access_token;

            if (access_token) {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://api-patient-dev.easy-health.app/medicines',
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                };
                const response = await axios.request(config);
                // console.log(response.data);
                await setMedicines(response.data);
                renderAlarmComponents();
            }
        } catch (error) {
            console.error('Error retrieving medicines:', error);
        }
    }

    const renderAlarmComponents = async () => {
        try {
            const existingAlarms = JSON.parse(await AsyncStorage.getItem('Alarms')) || [];
            
            const allAlarmComponents = [];
            const idCountMap = {}; // Map to track ID count for each medicine ID
            
            medicines.forEach(medicine => {
                const { start_time, frequency, name, id } = medicine;
                const startTimeDate = moment(start_time).format('YYYY-MM-DD'); 
                const currentTime = moment();
                const nextAlarmTime = moment(start_time);
        
                if (moment(start_time).isSame(moment(), 'day')) {
                    while (nextAlarmTime.isBefore(moment().endOf('day'))) {
                        let alarmData = {};
                        if (nextAlarmTime.isSameOrBefore(currentTime)) {
                            alarmData = { time: nextAlarmTime.format('HH:mm'), medicine: name, componentType: 'CrossAlarm', id: id };
                        } else if (nextAlarmTime.isBetween(currentTime, moment(currentTime).add(frequency, 'hours'), 'minute')) {
                            alarmData = { time: nextAlarmTime.format('HH:mm'), medicine: name, componentType: 'CrossBell', id: id };
                        } else {
                            alarmData = { time: nextAlarmTime.format('HH:mm'), medicine: name, componentType: 'BellAlarm', id: id };
                        }
                        allAlarmComponents.push(alarmData);
                        nextAlarmTime.add(frequency, 'hours');
                    }
                }
                idCountMap[id] = idCountMap[id] ? idCountMap[id] + 1 : 1; // Increment ID count for the current medicine ID
            });
        
            const filteredAlarmComponents = allAlarmComponents.filter(alarm => !existingAlarms.find(existingAlarm => existingAlarm.id === alarm.id));
    
            if (filteredAlarmComponents.length > 0) {
                const updatedAlarmsArray = existingAlarms.concat(filteredAlarmComponents);
                
                updatedAlarmsArray.sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')));
    
                const alarmsById = {};
                updatedAlarmsArray.forEach(alarm => {
                    const { id, medicine, time } = alarm;
                    const startTimeDate = moment(time, 'HH:mm').format('YYYY-MM-DD');
                    
                    if (!alarmsById[id]) {
                        alarmsById[id] = { id, medicine, times: [], days: [] };
                    }
                
                    if (!alarmsById[id].days.includes(startTimeDate)) {
                        alarmsById[id].days.push(startTimeDate);
                    }
                    
                    const idCount = idCountMap[id];
                    alarmsById[id].times.push({ time, id: idCount, taken: false });
                    idCountMap[id]++; 
                });
                
                const updatedAlarmsData = Object.values(alarmsById);
                console.log(JSON.stringify(updatedAlarmsData, null, 2)); // Stringify the array for better readability
                try {
                    await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarmsData));
                } catch (error) {
                    console.error('Error saving alarms to AsyncStorage:', error);
                }
            } else {
                console.log('No new alarms to add.');
            }
        } catch (error) {
            console.error('Error rendering alarm components:', error);
        }
    };

    const renderTimeComponents = async () => {
        try {
            const allAlarmComponents = [];
            const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
            AlarmsArray.forEach(alarm => {
                const { days, times, medicine, id } = alarm;
                const currentTime = moment();
                days.forEach(day => {
                    times.forEach(timeObj => { 
                        const { time, id: timeId ,taken } = timeObj;
                        const alarmTime = moment(`${day} ${time}`, 'YYYY-MM-DD HH:mm');
                        let alarmComponent;
                        if (alarmTime.isSameOrBefore(currentTime)) {              
                            alarmComponent = <CrossAlarm time={alarmTime.format('HH:mm')} medicineId={id} id={timeId} Medicine={medicine} taken={taken} reloadFunction={renderTimeComponents} />;
                        } else if (alarmTime.isBetween(currentTime, moment(currentTime).add(1, 'hour'))) {
                            alarmComponent = <CrossBell time={alarmTime.format('HH:mm')} id={timeId} Medicine={medicine} medicineId={id} taken={taken} reloadFunction={renderTimeComponents} />;
                        } else {
                            alarmComponent = <BellAlarm time={alarmTime.format('HH:mm')} id={timeId} Medicine={medicine} medicineId={id} taken={taken} reloadFunction={renderTimeComponents} />;
                        }
                        allAlarmComponents.push({ time: alarmTime.format('HH:mm'), component: alarmComponent });
                    });
                });
            });
    
            allAlarmComponents.sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')));
            const components = allAlarmComponents.map((item, index) => (
                <View style={styles.component} key={index}>
                    {item.component}
                </View>
            ));
            setAlarmComponents(components); 
        } catch (error) {
            console.error('Error rendering alarm components:', error);
        }
    };
    

    useEffect(() => {
        renderTimeComponents();
    }, []);


    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            // await AsyncStorage.setItem('Alarms', JSON.stringify(""));
            // await getMedicinesAndSupplements();
            renderTimeComponents();
        } catch (error) {
            console.error('Error refreshing medicines:', error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <View style={styles.headerContainer}>
                    <Image source={config.logo} style={styles.logo} />
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
                        <Image source={profileIcon} style={styles.profileLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameHeading}>Hello {name}!</Text>
                    <Text style={styles.nameSideHeading}>Welcome to Easy Patient</Text>
                </View>
                <View style={styles.parentView}>
                    {/* <View style={styles.component}>
                        <Notifications />
                    </View> */}
                    <View style={styles.sliderContainer}>
                        <FolderSlider />
                    </View>
                    
                    {alarmComponents}
                   


                </View>
            </ScrollView>
            <Footer />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
    nameContainer: {
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
    profileLogo: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
    },
    headerContainer: {
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
    parentView: {
        marginTop: '6%',
    },
});

export default Dashboard;
