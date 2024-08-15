import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config.js';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import fileGold from '../assets/fileGold.png';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import AttestaionsArchiveContainer from '../components/AttestationsArchiveConatiner';
import ReportsArchiveContainer from '../components/ReportsArchiveContainer';
import ReportsContainer from '../components/ReportsConatiner';

const ReportsArchive = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [reportsData, setReportsData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const isShow = route?.params?.isShow ?? false;
    const record_id = route?.params?.record_id ?? 0;
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/medical-report/archive',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setReportsData(response.data);
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
                <BackHeader name={"Reports Archive"} />
                {
                    reportsData && reportsData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                reportsData.map((record, index) => (
                                    <ReportsContainer key={index} record={record} isArchived={true} isShow={isShow} record_id={record_id} getData={getData} />
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={fileGold} style={styles.fileIcon} />
                            <Text style={styles.emptyText}>You do not have any Reports data</Text>
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
    },
    fileIcon: {
        height: 90,
        width: 90,
    },
});

export default ReportsArchive;
