import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, PixelRatio, TouchableOpacity, Platform } from 'react-native';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
import leftArrow from '../assets/leftArrow.png';
import fork from '../assets/forkWhite.png';
import { Email, openComposer } from 'react-native-email-link';
import heartBeat from '../assets/whiteScale.png';
import fileAdd from '../assets/fileAddWhite.png';
import fileCapsule from '../assets/fileCapsuleWhite.png';
import calendar from '../assets/calendarWhite.png';
import medicine from '../assets/medicineWhite.png';
import HomeWhite from '../assets/homeWhite.png';
import pen from '../assets/pen.png';
import EmailIcon from '../assets/EmailIcon.png';
import fileEditWhite from '../assets/fileEditWhite.png';
import Exam from '../assets/exam.png';
import ExamReq from '../assets/examWhite.png';
import ValidationMessageError from '../components/ValidationMessageError';
import Attestations from '../assets/writeWhite.png';
import fileWhite from '../assets/fileWhite.png';
import ConfirmationModal from '../components/ConfirmationModal';
import configure from '../assets/configureWhite.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import exit from '../assets/exit.png';
const SideBar = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [IOSError, setIOSError] = useState(false);
    const [image, setImage] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            await getUserDetails();
        };
        fetchData();
    }, []);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const getUserDetails = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        setName(responseObject.user.full_name);
        setEmail(responseObject.user.username);
        setImage(responseObject.user.profile_pic);
    }

    const Logout = async () => {
            toggleModal();
    }

    const handleEmailPress = () => {
        openComposer({
            to: "support@easy-health.app",
        }).catch((error) => {
            alert("No email apps available");
        });
    };

    return (
        <View style={styles.container}>
            <ValidationMessageError visible={IOSError} msg={errorMessage} setVisible={setIOSError} />
            <View style={styles.topHead}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Image source={leftArrow} style={styles.arrow}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                    <Image source={HomeWhite} style={styles.home} />
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 15, marginTop: 5, }}>
                <Image source={image ? { uri: image } : profileIcon} style={styles.Profilelogo} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Text style={styles.nameHeading}>{name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={pen} style={styles.pen} />
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.emailHeading}>{email}</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerList}>
                    <TouchableOpacity onPress={() => navigation.navigate("Prescriptions")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileCapsule} style={styles.file}></Image>
                            <Text style={styles.sideText}>Prescriptions</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("MealPlans")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fork} style={styles.fork}></Image>
                            <Text style={styles.sideText}>Meal Plans</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ExamRequest")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={ExamReq} style={styles.ExamReq}></Image>
                            <Text style={styles.sideText}>Exam Request</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Reminders")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={medicine} style={styles.jar}></Image>
                            <Text style={styles.sideText}>Reminders</Text>
                        </View>

                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Appointments")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={calendar} style={styles.calendar2}></Image>
                            <Text style={styles.sideText}>Appointments</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Guidelines")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileAdd} style={styles.file}></Image>
                            <Text style={styles.sideText}>Guidelines</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("BodyAssessments")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={heartBeat} style={styles.heart}></Image>
                            <Text style={{ ...styles.sideText, marginHorizontal: 5 }}>Body Assessments</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Reports")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={Exam} style={styles.calendar}></Image>
                            <Text style={styles.sideText}>Reports</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Attestations")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={Attestations} style={styles.fileEdit}></Image>
                            <Text style={styles.sideText}>Attestations/Declarations</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.navigate("FoodDiary")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileEditWhite} style={styles.fileEdit}></Image>
                            <Text style={styles.sideText}>Food Diary</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Anamnesis")} style={styles.appointments}>
                        <View style={styles.navigate}>
                            <Image source={fileAdd} style={styles.file}></Image>
                            <Text style={styles.sideText}>Anamnesis</Text>
                        </View>
                        <Text style={styles.sideText}>{'>'}</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
            <View style={[styles.horizontalLine, { marginBottom: 5, marginTop: 10, }]}></View>
            <View style={styles.containerList}>
                    <TouchableOpacity onPress={() => handleEmailPress()} style={styles.navigate}>
                        <Image source={EmailIcon} style={styles.mail}></Image>
                        <Text style={styles.sideText}>Support App</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Configure")} style={styles.navigate}>
                    <Image source={configure} style={styles.configure}></Image>
                    <Text style={styles.sideText}>Configure</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Logout()} style={styles.navigate}>
                    <Image source={exit} style={styles.exit}></Image>
                    <Text style={styles.exitText}>Exit</Text>
                </TouchableOpacity>
            </View>
            <ConfirmationModal isVisible={isModalVisible} toggleModal={toggleModal} Modalfor={"logout"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2A2A31',
        padding: 20,
        flex: 1,

    },
    navigate: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',

    },
    fork: {
        height: 21,
        width: 22,
    },
    pen: {
        height: 24,
        width: 16,
    },
    ExamReq: {
        width: 25,
        height: 12.5,
    },
    exit: {
        left: 4,
        height: 24,
        width: 21,
    },
    configure: {
        height: 22,
        width: 22,
    },
    mail: {
        height: 20,
        width: 20,
    },
    file: {
        height: 25,
        width: 20,
    },
    fileEdit: {
        height: 23,
        width: 18,
    },
    jar: {
        height: 25,
        width: 21,
    },
    heart: {
        height: 26,
        width: 18, 
    },
    calendar: {
        height: 23,
        width: 18,
    },
    calendar2: {
        height: 23,
        width: 21,
    },
    sideText: {
        fontSize: PixelRatio.getFontScale() * 18,
        fontFamily:config.fontStyle,
        color: 'white',
    },
    exitText:{
        fontSize: PixelRatio.getFontScale() * 18,
        fontFamily:config.fontStyle,
        color: config.secondaryColor,
    },
    home: {
        top: -5,
        height: 32,
        width: 31,
    },
    appointments: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '99%',
        alignSelf: 'center',
    },
    horizontalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 2,
    },
    containerList: {
        marginTop: 18,
        gap: 20,
    },
    topHead: {
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Platform.select({
            ios: {
                marginTop: 40,
            },
        })
    },
    Profilelogo: {
        height: 90,
        width: 90,
        alignSelf: 'center',
        borderRadius: 45,
    },
    nameHeading: {
        color: 'white',
        fontFamily:config.fontStyle,
        fontSize: PixelRatio.getFontScale() * 22,
        textAlign: 'center',
        fontWeight: '400',
    },
    emailHeading: {
        color: 'white',
        fontSize: PixelRatio.getFontScale() * 19,
        fontFamily:config.fontStyle,
        textAlign: 'center',
    },
    head: {
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
        left: '70%',
        fontFamily:config.fontStyle,
        color: 'black',
    },
    arrow: {
        height: 20,
        width: 20,
    },
    back: {
        backgroundColor: '#EAECEF',
        padding: 7,
        width: 36,
        height: 35,
        borderRadius: 20,
    },
});

export default SideBar;
