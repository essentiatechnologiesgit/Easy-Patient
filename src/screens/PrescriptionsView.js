import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, PixelRatio, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import config from '../../config';
import BackHeader from '../components/backHeader';
import PrescriptionDropDown from '../components/PrescriptionDropDown';
import downArrow from '../assets/downArrow.png';
import greenProfile from '../assets/greenProfile.png';
import axios from 'axios';
import { Pdf, PdfUtil } from 'react-native-pdf-light';
const PrescriptionsView = () => {
    const route = useRoute();
    const { record, isArchived } = route.params;
    const [showDropDown, setShowDropDown] = useState(false);
    const ToggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

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
            url: `https://api-patient-dev.easy-health.app/prescriptions/view/${record.id}`,
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
    return (
        <>
            <View style={styles.container}>
                <BackHeader name="View Prescriptions" />
                <TouchableOpacity onPress={ToggleDropDown} style={styles.dotsContainer}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </TouchableOpacity>
                <ScrollView style={styles.mailContainer}>
                    <Text style={styles.heading}>{record.type}</Text>
                    <View style={styles.recievedCont}>
                        <Image source={downArrow} style={styles.arrowIcon} />
                        <Text style={styles.subHeadings}>Received on: {record.title}</Text>
                    </View>
                    <View style={styles.specialistCont}>
                        <Image source={greenProfile} style={styles.arrowIcon} />
                        <Text style={styles.subHeadings}>Specialist: {record.specialist}</Text>
                    </View>
                    <View style={styles.pdfContainer}>
                        {
                            googleDocsUrl && injectedJavaScript &&
                            <WebView
                                source={{ uri: googleDocsUrl }}
                                startInLoadingState={true}
                                style={styles.webview}
                                scalesPageToFit={true}
                                injectedJavaScript={injectedJavaScript}
                            />
                        }
                    </View>
                </ScrollView>
                {
                    isArchived ?
                        <>
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} title={"PrescriptionsArchive"} />}
                        </>
                        :
                        <>
                            {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown} pdf={record.file} isArchived={isArchived} title={"Prescriptions"} />}
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
    },
    mailContainer: {
        padding: 20,
        flex: 1,
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
    heading: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.textColorHeadings,
        fontWeight: 'bold',
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

export default PrescriptionsView;
