import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute,useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import archive from '../assets/archive.png';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import AttestationsContainer from '../components/AttestationContainer';
import AttestationsGold from '../assets/AttestationsGold.png';
const Attestations = () => {
    const route = useRoute();
    const isHide = route?.params?.isHide ?? false;
    const record_id = route?.params?.record_id ?? 0;
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [assessmentData, setAssessmentData] = useState([]);
    const isFocused = useIsFocused();
    const [showLoader, setShowLoader] = useState(true);
    useEffect(() => {
        getData();
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
            url: 'https://api-patient-dev.easy-health.app/attestation/',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setAssessmentData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    }


    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Attestations/Declarations"} />
                <TouchableOpacity onPress={() => navigation.navigate("AttestationsArchive")} style={styles.touch}>
                    <Image source={archive} style={styles.archiveIcon} />
                </TouchableOpacity>
                {
                    assessmentData && assessmentData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                assessmentData.map((record, index) => (
                                    <AttestationsContainer key={index} record={record} isHide={isHide} record_id={record_id} getData={getData}/>
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={AttestationsGold} style={styles.fileIcon} />
                            <Text style={styles.emptyText}>You do not have any Attestations/Declarations data</Text>
                        </View>
                }
                {showLoader && <ModalLoader />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
        // justifyContent:'center',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '70%',
        alignSelf: 'center'
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
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
        ...Platform.select({
            ios: {
                marginTop: 40,
            },
        })
    },
    fileIcon: {
        height: 80,
        width: 65,
    },
});

export default Attestations;
