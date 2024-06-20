import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, Dimensions, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import greenProfile from '../assets/greenProfile.png';
import downArrow from '../assets/downArrow.png';
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
import Pdf from 'react-native-pdf';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import PrescriptionDropDown from '../components/PrescriptionDropDown';

const ReportsView = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { record, isArchived } = route.params;
    const scrollViewRef = useRef();
    const [showDropDown, setShowDropDown] = useState(false);

    const ToggleDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    useEffect(() => {
        if (record.is_new) {
            updateRecord()
        }
    }, [])

    const updateRecord = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api-patient-dev.easy-health.app/medical-report/view/${record.id}`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"View Reprots"} />
                <TouchableOpacity onPress={ToggleDropDown} style={styles.dotsContainer}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </TouchableOpacity>
                <ScrollView style={styles.mailContainer}>
                    <View>
                        <Text style={styles.doctor}>Dr.{record.specialist} at {record.date}</Text>
                    </View>
                    <View style={styles.pdfContainer}>
                        <Pdf
                            trustAllCerts={false}
                            source={{ uri: record.file }}
                            style={{ flex: 1, width: Dimensions.get('window').width }}
                        />
                    </View>
                </ScrollView>
                {
                    isArchived ?
                        <>
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} record_id={record.id} title={"ReportsArchive"} />}
                        </>
                        :
                        <>
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} record_id={record.id} title={"Reports"} />}
                        </>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    mailContainer: {
        padding: 30,
    },
    paragraph: {
        width: '90%',
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    doctor: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.primaryColor,
    },
    subHeadings: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
    },
    pdfContainer: {
        flex: 1,
        height: Dimensions.get('window').height - 200, // Adjust to fit the height of your screen
        marginTop: 20,
    },
    dotsContainer: {
        flexDirection: 'column', // Align dots vertically
        justifyContent: 'space-between', // Distribute dots evenly
        height: 25,
        width: 30,
        alignItems: 'center', // Set height of the container
        gap: 4,
        position: 'absolute',
        right: 0,
        marginTop: 20,
        marginRight: 24,
    },
    dot: {
        width: 6, // Diameter of the dot
        height: 6,
        borderRadius: 3, // Make it circular
        backgroundColor: 'black', // Color of the dot
    },
    para: {
        marginTop: 20,
        color: config.primaryColor,
    },
    recievedCont: {
        marginTop: 10,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowIcon: {
        height: 12,
        width: 12,
    },
    specialistCont: {
        marginTop: 2,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default ReportsView;
