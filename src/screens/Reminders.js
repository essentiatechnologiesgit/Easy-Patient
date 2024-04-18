import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, PixelRatio, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import medicine from '../assets/medicine.png';
import arrow from '../assets/arrow.png';
import config from '../../config';

const Reminders = () => {
    const [medicineData, setMedicineData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { accessToken, userId } = await getUsersData();
            getMedicineData(accessToken, userId);
        }
        fetchData();
    }, []);

    const getUsersData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const userId = responseObject.user.user_id;
        const accessToken = responseObject.access_token;
        return { accessToken, userId };
    }

    const getMedicineData = async (accessToken, userId) => {
        const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
        if (AlarmsArray) {
            const filteredAlarms = AlarmsArray.filter(alarm => alarm.user_id === userId);
            setMedicineData(filteredAlarms);
        }
    }

    const calculateNextDosageTime = (times) => {
        const currentTime = new Date(); // Get the current time
    
        for (const time of times) {
            const [hours, minutes] = time.time.split(':').map(Number); // Parse the time string
            const dosageTime = new Date(); // Create a Date object for the dosage time
            dosageTime.setHours(hours);
            dosageTime.setMinutes(minutes);
    
            if (dosageTime > currentTime) {
                return dosageTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
            }
        }
    
        const firstDosageTime = new Date();
        firstDosageTime.setDate(firstDosageTime.getDate() + 1);
        const [hours, minutes] = times[0].time.split(':').map(Number);
        firstDosageTime.setHours(hours);
        firstDosageTime.setMinutes(minutes);
        return firstDosageTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Reminders"} />
                <View style={styles.scrollViewContainer}>
                    {medicineData.map((item, index) => (
                        <TouchableWithoutFeedback key={index}>
                            <View style={styles.medicineContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={medicine} style={styles.profileLogo} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.medicineTextHeading}>{item.medicine}</Text>
                                    <Text style={styles.medicineTextSide}>{`Next dose: ${calculateNextDosageTime(item.times)}`}</Text>
                                    <Text style={styles.medicineTextGrey}>After every {item.frequency} hour</Text>
                                    <Text style={styles.medicineTextGrey}>{item.dosage}</Text>
                                </View>
                                <Image source={arrow} style={styles.arrowLogo} />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: 100, // Adjust as needed
    },
    medicineContainer: {
        flexDirection: 'row',
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: config.primaryColor,
    },
    textContainer: {
        padding: 5,
        marginLeft: 10,
        width: '72%',
    },
    arrowLogo: {
        height: 22,
        width: 15,
        alignSelf: 'center',
    },
    medicineTextHeading: {
        fontSize: PixelRatio.getFontScale() * 20,
        fontWeight: 'bold',
        color: config.textColorHeadings,
    },
    medicineTextSide: {
        fontSize: PixelRatio.getFontScale() * 16,
        fontWeight: 'bold',
        color: config.textColorHeadings,
    },
    medicineTextGrey: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
    },
    imageContainer: {
        borderRadius: 40,
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: config.secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    profileLogo: {
        height: 52,
        width: 35,
    },
});

export default Reminders;
