import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, PixelRatio, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import medicine from '../assets/medicine.png';
import arrow from '../assets/arrow.png';
import config from '../../config';
import Footer from '../components/Footer';
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import CircleButton from '../components/CircleButton';
import yellowDrop from '../assets/yellowDrop.png';
import redDrop from '../assets/redDrop.png';
import blackDrop from '../assets/blackDrop.png';
import blueDrop from '../assets/blueDrop.png';
import yellowDrink from '../assets/yellowDrink.png';
import redDrink from '../assets/redDrink.png';
import blueDrink from '../assets/blueDrink.png';
import blackDrink from '../assets/blackDrink.png';
import yellowMed from '../assets/yellowMed.png';
import blueMed from '../assets/blueMed.png';
import redMed from '../assets/redMed.png';
import blackMed from '../assets/blackMed.png';
import yellowCapsule from '../assets/yellowCapsule.png';
import blueCapsule from '../assets/blueCapsule.png';
import redCapsule from '../assets/redCapsule.png';
import blackCapsule from '../assets/blackCapsule.png';
import medicineWhite from '../assets/medicineLarge.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment";
const Reminders = () => {
    const [medicineData, setMedicineData] = useState([]);
    const navigation = useNavigation();
    const [image, setImage] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        async function fetchData() {
            const { accessToken, userId } = await getUsersData();
            getMedicineData(accessToken, userId);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (isFocused) {
            async function fetchData() {
                const { accessToken, userId } = await getUsersData();
                getMedicineData(accessToken, userId);
            }
            fetchData();
        }
    }, [isFocused]);

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
        if (!times || !Array.isArray(times) || times.length === 0) {
            console.error("Invalid times array:", times);
            return "Invalid times data";
        }

        const currentTime = moment();

        for (const timeObj of times) {
            if (timeObj && timeObj.time) {
                const dosageTime = moment(timeObj.time, 'YYYY-MM-DD HH:mm');

                if (dosageTime.isAfter(currentTime)) {
                    return dosageTime.format('MMMM D, YYYY h:mm A');
                }
            } else {
                console.error("Invalid time object:", timeObj);
            }
        }

        const firstDosageTime = moment(times[0].time, 'YYYY-MM-DD HH:mm').add(1, 'day');
        return firstDosageTime.format('MMMM D, YYYY h:mm A');
    };




    const renderImage = (selectedImage) => {
        switch (selectedImage) {
            case 1:
                return <Image source={blackMed} style={styles.Profilelogo} />;
            case 2:
                return <Image source={require('../assets/blackCapsule.png')} style={styles.capsulelogo} />;
            case 3:
                return <Image source={blackDrop} style={styles.Profilelogo} />;
            case 4:
                return <Image source={blackDrink} style={styles.Profilelogo} />;
            case 5:
                return <Image source={blueMed} style={styles.Profilelogo} />;
            case 6:
                return <Image source={blueCapsule} style={styles.capsulelogo} />;
            case 7:
                return <Image source={blueDrop} style={styles.Profilelogo} />;
            case 8:
                return <Image source={blueDrink} style={styles.Profilelogo} />;
            case 9:
                return <Image source={yellowMed} style={styles.Profilelogo} />;
            case 10:
                return <Image source={yellowCapsule} style={styles.capsulelogo} />;
            case 11:
                return <Image source={yellowDrop} style={styles.Profilelogo} />;
            case 12:
                return <Image source={yellowDrink} style={styles.Profilelogo} />;
            case 13:
                return <Image source={redMed} style={styles.Profilelogo} />;
            case 14:
                return <Image source={redCapsule} style={styles.capsulelogo} />;
            case 15:
                return <Image source={redDrop} style={styles.Profilelogo} />;
            case 16:
                return <Image source={redDrink} style={styles.Profilelogo} />;
            case 17:
                return <Image source={{ uri: image }} style={styles.ProfileImage} />;
            case 18:
                return <Image source={{ uri: image }} style={styles.ProfileImage} />;
            default:
                return <Image source={blackMed} style={styles.Profilelogo} />; // Return null if selectedImage is not set
        }
    };



    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Reminders"} />
                <View style={styles.touch}>
                    <CircleButton title={"AddReminder"} />
                </View>
                {
                    medicineData && medicineData.length > 0 ?

                        <ScrollView style={styles.scrollViewContainer}>
                            {
                                medicineData.map((item, index) => (
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("UpdateReminder", { medicineId: item.id })} key={index}>
                                        <View style={styles.medicineContainer}>
                                            <View style={styles.imageContainer}>
                                                {
                                                    item.picture_link ?
                                                        <Image source={item.picture_link ? { uri: item.picture_link } : { renderImage }} style={styles.profileLogo} />
                                                        :
                                                        renderImage(item.selectedImage)
                                                }
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
                                ))
                            }
                        </ScrollView>
                        :
                        <>
                            <View style={styles.Empty}>
                                <Image source={medicineWhite} style={styles.medicineWhite} />
                                <Text style={styles.emptyText}>You do not have any medications or Supplement reminder</Text>
                                <Text style={styles.emptyText}>Add now</Text>
                                <View style={styles.button}>
                                    <CircleButton title={"AddReminder"} />
                                </View>
                            </View>
                        </>
                }
            </View>
            <Footer prop={1} />
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
    medicineWhite: {
        height: 80,
        width: 75,
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '70%',
        alignSelf: 'center'
    },
    touch: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    capsulelogo: {
        height: 30,
        width: 30,
    },
    medicineContainer: {
        flexDirection: 'row',
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 0.40,
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
    Profilelogo: {
        height: 36,
        width: 24,
        borderColor: config.secondaryColor,
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
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
});

export default Reminders;
