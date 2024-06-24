import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import PrescriptionContainer from '../components/PrescriptionContainer';
import GoldenCapsule from '../assets/goldenCapsule.png';
const PrescriptionsArchive = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [showLoader , setShowLoader ] = useState(true);
    const isShow = route?.params?.isShow ?? false;
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/prescriptions/archive',
            headers: {
                'Authorization': `Bearer ${access_token}`,

            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setPrescriptionsData(response.data);
                setShowLoader(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }



    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Prescriptions Archive"} />
                {
                    prescriptionsData && prescriptionsData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                prescriptionsData.map((record, index) => (
                                    <PrescriptionContainer key={index} record={record} isArchived={true} isShow={isShow} />
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={GoldenCapsule}  style={styles.fileIcon}/>
                            <Text style={styles.emptyText}>You do not have any prescriptions data</Text>
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
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        gap:30,
    },
    fileIcon:{
        height:90,
        width:70,
    },
});

export default PrescriptionsArchive;
