import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config.mjs';
import { useNavigation, useRoute } from '@react-navigation/native';
import archiveGold from '../assets/archiveGold.png';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showIcon from '../assets/showIcon.png';
const ReportsContainer = ({ record, isArchived, isHide, isShow, record_id ,getData }) => {
    const navigation = useNavigation();

    useEffect(() => {
        if (isHide)
            handleHide();
    }, [isHide])

    useEffect(() => {
        if (isShow)
            handleShow();
    }, [isShow])


    const handleShow = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api-patient-dev.easy-health.app/medical-report/available/${record_id !== 0 ? record_id : record.id}`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
               getData()
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const handleHide = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api-patient-dev.easy-health.app/medical-report/archive/${record_id !== 0 ? record_id : record.id}`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };
        console.log(config);
        axios.request(config)
            .then((response) => {
                getData()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ReportsView', { record: record, isArchived, isArchived })}>
                <View style={styles.container}>
                    <Text style={styles.subHeadings}>Received {record.title}</Text>
                    <Text style={styles.text}>{record.specialist}</Text>
                    <Text style={styles.text}>{record.clinic_name}</Text>
                    {
                        !isArchived ?
                            <TouchableOpacity style={styles.hideContainer} onPress={() => handleHide()}>
                                <Image source={archiveGold} style={styles.archiveIcon} />
                                <Text style={styles.hide}>hide</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity style={styles.hideContainer} onPress={() => handleShow()}>
                                <Image source={showIcon} style={styles.showIcon} />
                                <Text style={styles.hide}>Show</Text>
                            </TouchableOpacity>
                    }
                    {
                        record.is_new &&
                        <View style={styles.NewContainer}>
                            <Text style={styles.New}>New</Text>
                        </View>
                    }
                    <Image source={arrow} style={styles.arrowLogo} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '93%',
        alignSelf: 'center',
        gap:3,
    },
    showIcon: {
        height: 16,
        width: 14,
    },
    NewContainer: {
        height: 25,
        width: 38,
        position: 'absolute',
        right: 0,
        top: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B8E0C3',
    },
    hideContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: config.secondaryColor,
        height: 25,
        width: 62,
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 5,
    },
    hide: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 12,
        
    },
    New: {
        color: '#146229',
        fontSize: PixelRatio.getFontScale() * 12,
        
    },
    arrowLogo: {
        position: 'absolute', // Position the arrow absolutely
        height: 20,
        width: 13,
        top: 40, // Adjust this value as needed
        right: 0, // Position the arrow to the right
    },
    archiveIcon: {
        height: 15.5,
        width: 13,
    },
    headings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 18,
        
        fontWeight: 'bold',
    },
    hideContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: config.secondaryColor,
        height: 25,
        gap: 3,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 3,
    },
    hide: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 12,
        
    },
    subHeadings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        
        fontWeight: '600',
    },
    text: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        
    },
});

export default ReportsContainer;
