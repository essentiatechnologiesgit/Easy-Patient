import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
import leftArrow from '../assets/leftArrow.png';
import fork from '../assets/forkWhite.png';
import heartBeat from '../assets/heartWhite.png';
import fileAdd from '../assets/fileAddWhite.png';
import fileCapsule from '../assets/fileCapsuleWhite.png';
import calendar from '../assets/calendarWhite.png';
import medicine from '../assets/medicineWhite.png';
import HomeWhite from '../assets/homeWhite.png';
import pen from '../assets/pen.png';

import configure from '../assets/configureWhite.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import exit from '../assets/exit.png';
const SideBar = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            await getUserDetails();
        };
        fetchData();
    }, []);

    const getUserDetails = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        setName(responseObject.user.full_name);
        setEmail(responseObject.user.username);
        setImage(responseObject.user.profile_pic);
    }

    const Logout = async () => {
        await AsyncStorage.setItem('loginResponse', '');
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.topHead}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Image source={leftArrow} style={styles.arrow}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                    <Image source={HomeWhite} style={styles.home} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ marginBottom: 15 }}>
                    <Image source={image ? { uri: image } : profileIcon} style={styles.Profilelogo} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <Text style={styles.nameHeading}>{name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image source={pen} style={styles.pen} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.emailHeading}>{email}</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.containerList}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Appointments")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={calendar} style={styles.calendar}></Image>
                            <Text style={styles.sideText}>Appointments</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Reminders")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={medicine} style={styles.jar}></Image>
                            <Text style={styles.sideText}>Reminders</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Prescriptions")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileCapsule} style={styles.file}></Image>
                            <Text style={styles.sideText}>Prescriptions</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate("Guidelines")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileAdd} style={styles.file}></Image>
                            <Text style={styles.sideText}>Guidelines</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate("MealPlans")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fork} style={styles.fork}></Image>
                            <Text style={styles.sideText}>Meal Plans</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>navigation.navigate("HealthRecommendation")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={heartBeat} style={styles.heart}></Image>
                            <Text style={styles.sideText}>Health Recommendations</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.horizontalLine, { marginTop: 35 }]}></View>
                <View style={styles.containerList}>
                    <TouchableOpacity onPress={() => navigation.navigate("Configure")} style={styles.navigate}>
                        <Image source={configure} style={styles.configure}></Image>
                        <Text style={styles.sideText}>Configure</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Logout()} style={styles.navigate}>
                        <Image source={exit} style={styles.exit}></Image>
                        <Text style={styles.sideText}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2A2A31',
        padding: 20,
        flex: 1,
    },
    navigate: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    fork: {
        height: 21,
        width: 22,
    },
    pen: {
        height: 24,
        width: 16,
    },
    exit: {
        left: 5,
        height: 24,
        width: 21,
    },
    configure: {
        height: 22,
        width: 22,
    },
    file: {
        height: 25,
        width: 20,
    },
    jar: {
        height: 25,
        width: 21,
    },
    heart: {
        height: 21,
        width: 24,
    },
    calendar: {
        height: 22,
        width: 21,
    },
    sideText: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: 'white',
    },
    home: {
        top:-5,
        height: 32,
        width: 31,
    },
    appointments: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    containerList: {
        marginTop: 25,
        gap: 40,
    },
    topHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Profilelogo: {
        height: 90,
        width: 90,
        alignSelf: 'center',
        borderRadius: 48,
    },
    nameHeading: {
        color: 'white',
        fontSize: PixelRatio.getFontScale() * 22,
        textAlign: 'center',
        fontWeight: '400',
    },
    emailHeading: {
        color: 'white',
        fontSize: PixelRatio.getFontScale() * 19,
        textAlign: 'center',
    },
    head: {
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
        left: '70%',
        color: 'black',
    },
    arrow: {
        height: 20,
        width: 20,
    },
    back: {
        backgroundColor: '#EAECEF',
        padding: 7,
        width: 36,
        height: 35,
        borderRadius: 20,
    },
});

export default SideBar;
