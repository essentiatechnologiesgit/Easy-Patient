import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, Image, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import fork from '../assets/fork.png';
import heartBeat from '../assets/zipBlack.png';
import fileAdd from '../assets/fileAdd.png';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import fileLife from '../assets/examBlack.png';
import Scale from '../assets/blackScale.png';
import fileEdit from '../assets/writeBlack.png';
import fileCapsule from '../assets/fileCapsule.png';
import config from "../../config.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';

const FolderSlider = () => {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const [recommentations, setRecommentations] = useState(0);
    const [prescription, setPrescriptions] = useState(0);
    const [Exam, setExam] = useState(0);
    const [Guidelines, setGuidelines] = useState(0);
    const [assessment, setAssessment] = useState(0);
    const [anamnesis, setAnnemnesis] = useState(0);
    const [reports, setReports] = useState(0);
    const isFocused = useIsFocused();
    const [attestations, setAttestations] = useState(0);
    const [orientations, setOrientations] = useState(0);
    const [meal, setMeal] = useState(0);
    const { t } = useTranslation();
    useEffect(() => {
        const getAccessToken = async () => {
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            const responseObject = JSON.parse(loginResponse);
            const access_token = responseObject.access_token;
            getCounts(access_token);
        }
        getAccessToken();
    }, [])

    useEffect(() => {
        const getAccessToken = async () => {
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            const responseObject = JSON.parse(loginResponse);
            const access_token = responseObject.access_token;
            getCounts(access_token);
        }
        getAccessToken();
    }, [isFocused])

    const getCounts = (access_token) => {
        getPrescriptions(access_token);
        getPlans(access_token);
        getExams(access_token);
        getGuidelines(access_token);
        getReports(access_token);
        getAttestations(access_token);
        getAssessments(access_token);
    }

    const getPrescriptions = async (access_token) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/prescriptions',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setPrescriptions(response.data.length)

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getPlans = (access_token) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/meal-plan',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setMeal(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getExams = (access_token) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/exam-guide',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setExam(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getGuidelines = (access_token) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/orientations',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setGuidelines(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAssessments = (access_token) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/body-assessment',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setAssessment(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getReports = (access_token) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/medical-report/',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setReports(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    } 

    const getAttestations = (access_token) =>{
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
                // console.log(JSON.stringify(response.data));
                setAttestations(response.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Text style={styles.heading}>{t('MyFiles')}</Text>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                contentContainerStyle={styles.scrollViewContent}
                snapToInterval={100}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("Prescriptions")} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={fileCapsule} style={styles.filelogo}></Image>
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">{t('Prescriptions')}</Text>
                            <Text style={styles.files}>{prescription}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("MealPlans", { setMeal })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={fork} style={styles.logo}></Image>
                        <View style={{ marginLeft: 10, marginTop: -3 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">{t('Meal Plans')}</Text>
                            <Text style={styles.files}>{meal}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ExamRequest", { setExam })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={heartBeat} style={styles.zipBlack}></Image>
                        <View style={{ marginLeft: 10, marginTop: 2 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">
                            {t('Exam Requests')}
                            </Text>
                            <Text style={styles.files}>{Exam}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Guidelines", { setGuidelines })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={fileAdd} style={styles.filelogo}></Image>
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">{t('Guidelines')}</Text>
                            <Text style={styles.files}>{Guidelines}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("BodyAssessments", { setAssessment })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={Scale} style={styles.Scale}></Image>
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">
                            {t('Body Assessments')}
                            </Text>
                            <Text style={styles.files}>{assessment}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Reports", { setReports })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={fileLife} style={styles.filelogo}></Image>
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">
                            {t('Reports')}
                            </Text>
                            <Text style={styles.files}>{reports}  {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Attestations", { setAttestations })} style={styles.FolderContainer}>
                        <View style={styles.smallContainer}>
                        </View>
                        <Image source={fileEdit} style={styles.filelogo}></Image>
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">
                            {t('Attestations/Declarations')}  
                            </Text>
                            <Text style={styles.files}>{attestations} {t('files')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
        marginBottom: -10,
        fontWeight: '600',
        fontFamily:config.fontStyle,
    },
    scrollViewContent: {
        alignItems: "center",
    },
    folderHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: "black",
        fontFamily:config.fontStyle,
    },
    zipBlack:{
        top:-10,
        left:8,
        height:19,
        width:38,
    },
    files: {
        fontSize: PixelRatio.getFontScale() * 14,
        color: config.textColorHeadings,
    },
    FolderContainer: {
        width: 145,
        height: 90,
        borderRadius: 14,
        marginRight: 20,
        opacity: 1,
        backgroundColor: config.modalColor,
        elevation: 0.5,
    },
    logo: {
        top: -10,
        height: 25,
        width: 25,
        marginLeft: 10,
    },
    filelogo: {
        top: -10,
        height: 26,
        width: 20.5,
        marginLeft: 10,
    },

    Scale: {
        top: -10,
        height: 28,
        width: 9.5,
        marginLeft: 10,

    },
    heartlogo: {
        top: -10,
        height: 26,
        width: 30,
        marginLeft: 10,
    },
    fileEdit: {
        top: -10,
        height: 26,
        width: 32,
        marginLeft: 10,
    },
    smallContainer: {
        backgroundColor: config.modalColor,
        height: 20,
        width: 50,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        bottom: 10,
    },
});

export default FolderSlider;
