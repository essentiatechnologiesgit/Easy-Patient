import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config.mjs';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
import { ScrollView } from 'react-native-gesture-handler';
import arrow from '../assets/arrow.png';
import archive from '../assets/archive.png';
import BackHeader from '../components/backHeader';
import calendarGold from '../assets/calendarGold.png';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoader from '../components/ModalLoader';
import axios from 'axios';
import AppointmentContainer from '../components/AppointmentContainer';
const Appointments = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [showLoader, setShowLoader] = useState(true);
    const [appointmentsData, setAppointmentsData] = useState([]);
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData();
    }, [isFocused])

    const getData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/appointments',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setAppointmentsData(response.data);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setShowLoader(false);
            });
    }

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Appointments"} />
                {
                    appointmentsData && appointmentsData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                appointmentsData.map((record, index) => (
                                    <AppointmentContainer key={index} record={record} getData={getData}  />
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={calendarGold} style={styles.fileIcon} />
                            <Text style={styles.emptyText}>You do not have any Appointments data</Text>
                        </View>
                }
                {showLoader && <ModalLoader />}
            </View>
            <Footer prop={2} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
    },
    archiveIcon: {
        height: 25,
        width: 25,
        margin: 20,
    },
    touch: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 16,
        width: '90%',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        gap: 30,
    },
    fileIcon: {
        height: 75,
        width: 70,
    },
});

export default Appointments;
