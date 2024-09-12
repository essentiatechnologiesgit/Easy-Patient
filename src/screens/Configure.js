import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, Alert, StyleSheet, Switch, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import { Linking, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import notifee, { AndroidImportance, AndroidBadgeIconType } from '@notifee/react-native';
import i18next, { languageResources } from '../../services/i18next.js';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/en'; // Import locales you need
import 'dayjs/locale/pt';

dayjs.extend(advancedFormat);
const Configure = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(false);
    const [switch3, setSwitch3] = useState(true);
    const [switch4, setSwitch4] = useState(true);
    const [switch5, setSwitch5] = useState(false);
    const [switch6, setSwitch6] = useState(false);

    const { t } = useTranslation();
    const openBatteryOptimizationSettings = () => {
        Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please disable battery optimization for the app.',
            [
                {
                    text: 'OK, open settings',
                    onPress: async () => await notifee.openBatteryOptimizationSettings(),
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    };
    const AppearOnTop = () => {
        let settingsURL;

        if (Platform.OS === 'android') {
            settingsURL = 'package:' + 'your.package.name' + '/notification';
        } else if (Platform.OS === 'ios') {
            settingsURL = 'app-settings:';
        }

        if (settingsURL) {
            Linking.openSettings();
        } else {
            console.error('Settings URL not supported on this platform');
        }
    }
    const toggleSwitch = async (number) => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const userId = responseObject.user.user_id;

        let configurations = await AsyncStorage.getItem('Configurations');
        configurations = configurations ? JSON.parse(configurations) : {};

        // Ensure that configurations[userId] is initialized
        if (!configurations[userId]) {
            configurations[userId] = {};
        }

        let newSwitchState;
        switch (number) {
            case 1:
                newSwitchState = !switch1;
                setSwitch1(newSwitchState);
                configurations[userId].switch1 = newSwitchState;
                break;
            case 2:
                newSwitchState = !switch2;
                setSwitch2(newSwitchState);
                configurations[userId].switch2 = newSwitchState;
                AppearOnTop();
                break;
            case 3:
                newSwitchState = !switch3;
                setSwitch3(newSwitchState);
                configurations[userId].switch3 = newSwitchState;
                break;
            case 4:
                newSwitchState = !switch4;
                setSwitch4(newSwitchState);
                configurations[userId].switch4 = newSwitchState;
                openBatteryOptimizationSettings();
                break;
            case 5:
                newSwitchState = !switch5;
                setSwitch5(newSwitchState);
                configurations[userId].switch5 = newSwitchState;
                break;
            default:
                newSwitchState = false;
        }
        await AsyncStorage.setItem('Configurations', JSON.stringify(configurations));
    };


    const setSwitchesFromStorage = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const userId = responseObject.user.user_id;
        let configurations = await AsyncStorage.getItem('Configurations');
        configurations = configurations ? JSON.parse(configurations) : {};

        if (configurations[userId]) {
            const userConfig = configurations[userId];
            setSwitch1(userConfig.switch1);
            setSwitch2(userConfig.switch2);
            setSwitch3(userConfig.switch3);
            setSwitch4(userConfig.switch4);
            setSwitch5(userConfig.switch5);
        }
    };

    useEffect(() => {
        setSwitchesFromStorage();
    }, []);

    const deletAccount = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const email = responseObject.user.username;

        navigation.navigate("DeleteAccount", { email })
    }



    const toggleLanguage = () => {
        let newSwitchState = !switch6; // Toggle the current switch state
        setSwitch6(newSwitchState);
    
        // Change language based on the new state of the switch
        if (newSwitchState) {
            changeLng("pt"); // Switch is on, set language to Portuguese
        } else {
            changeLng("en"); // Switch is off, set language to English
        }
    }
    
    const changeLng = lng => {
        console.log(lng);
        i18next.changeLanguage(lng); // Change the language using i18next
        dayjs.locale(lng);
    };

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Configure"} />
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                        thumbColor={switch1 ? '#4CB56A' : '#EEEFF1'}
                        ios_backgroundColor={config.primaryColor}
                        onValueChange={() => { toggleSwitch(1) }}
                        value={switch1}
                    />
                    <Text style={styles.mainText}>{t('NotifyText')}</Text>
                </View>
                {
                    Platform.OS === 'android' &&
                    <View style={styles.configureContainer}>
                        <Switch
                            trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                            thumbColor={switch2 ? '#4CB56A' : '#EEEFF1'}
                            ios_backgroundColor={config.primaryColor}
                            onValueChange={() => { toggleSwitch(2) }}
                            value={switch2}
                        />
                        <Text style={styles.mainText}>{t('MedicineReminder')}</Text>
                    </View>
                }

                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                        thumbColor={switch3 ? '#4CB56A' : '#EEEFF1'}
                        ios_backgroundColor={config.primaryColor}
                        onValueChange={() => { toggleSwitch(3) }}
                        value={switch3}
                    />
                    <Text style={styles.mainText}>{t('NotifyAppointmentText')}</Text>
                </View>
                <View style={styles.configureSideContainer}>
                    <Text style={styles.sideText}>{t('notifiedText')}</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                        thumbColor={switch4 ? '#4CB56A' : '#EEEFF1'}
                        ios_backgroundColor={config.primaryColor}
                        onValueChange={() => { toggleSwitch(4) }}
                        value={switch4}
                    />
                    <Text style={styles.mainText}>{t('AllowAppText')}</Text>
                </View>

                {
                    Platform.OS === 'android' &&
                    <View style={styles.configureContainer}>
                        <Switch
                            trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                            thumbColor={switch5 ? '#4CB56A' : '#EEEFF1'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => { toggleSwitch(5) }}
                            value={switch5}
                        />
                        <Text style={styles.mainText}>{t('AllowFaceID')}</Text>
                    </View>
                }
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: '#EEEFF1', true: '#D3ECDB' }}
                        thumbColor={switch6 ? '#4CB56A' : '#EEEFF1'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleLanguage() }}
                        value={switch6}
                    />
                    <Text style={styles.mainText}>Enable Portuguese Language</Text>

                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("TermsAndConditions", { isConfigure: true }) }} style={styles.terms}><Text style={styles.termsText}>{t('Terms&Conditions')}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { deletAccount() }} style={styles.delete}><Text style={styles.deleteText}>{t('DeleteAccount')}</Text></TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
    },
    terms: {
        alignSelf: 'center',
        marginTop: 35,
    },
    deleteText: {
        color: 'red',
        textDecorationLine: 'underline',
    },
    termsText: {
        color: config.primaryColor,
        textDecorationLine: 'underline',
    },
    delete: {
        alignSelf: 'center',
        marginTop: 30,
    },
    configureContainer: {
        marginTop: 30,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    configureSideContainer: {
        width: '85%',
        alignSelf: 'center',
    },
    mainText: {
        color: config.textColorHeadings,
        width: '90%',
        ...Platform.select({
            ios: {
                marginLeft: 5,
            },
        }),
    },
    sideText: {
        color: config.primaryColor,
        width: '90%',
        marginLeft: '10%',
        ...Platform.select({
            ios: {
                marginLeft: 45,
            },
        }),
    },
});

export default Configure;
