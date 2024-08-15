import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, PermissionsAndroid, Image, PixelRatio, TouchableOpacity, Dimensions } from 'react-native';
import config from '../../config.mjs';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import downArrow from '../assets/downArrow.png';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import BackHeader from '../components/backHeader';
import PrescriptionDropDown from '../components/PrescriptionDropDown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GuidelinesView = () => {
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
            url: `https://api-patient-dev.easy-health.app/orientations/view/${record.id}`,
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

    const pdfUrl = record.file;
    const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
    const injectedJavaScript = `
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        document.getElementsByTagName('head')[0].appendChild(meta);
    `;


    const source = {
        uri: 'https://s3.sa-east-1.amazonaws.com/easy-rx.com/uploads/161/plano_alimentar_simplificado/plano_alimentar_simplificado_1718107003153.7644_607_116.pdf',
        cache: true,
        type: 'application/pdf',
    };

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);

                if (
                    granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
                    granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions not granted');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    React.useEffect(() => {
        requestPermissions();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"View Guidelines"} />
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
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} record_id={record.id} title={"GuidelinesArchive"} />}
                        </>
                        :
                        <>
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} record_id={record.id} title={"Guidelines"} />}
                        </>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
    },
    mailContainer: {
        flex: 1,
        ...Platform.select({
            android: {
                padding: 20,
            },
        })
    },
    pdfContainer: {
        flex: 1,
        height: Dimensions.get('window').height - 200, // Adjust to fit the height of your screen
        marginTop: 20,
    },
    webview: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    doctor:{
         fontSize: PixelRatio.getFontScale() * 18,
         color: config.primaryColor,
         ...Platform.select({
            ios: {
                marginLeft: 30,
            },
        })
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.primaryColor,
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                marginLeft: 30,
                marginTop:20,
            },
        })
    },
    subHeadings: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
        
    },
    dotsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 25,
        width: 30,
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        marginTop: 20,
        marginRight: 24,
        ...Platform.select({
            ios: {
                marginTop: 60,
            },
        })
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'black',
    },
    recievedCont: {
        marginTop: 20,
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

export default GuidelinesView;
