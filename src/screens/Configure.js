import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated,Alert, StyleSheet, Switch, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import { Linking, Platform } from 'react-native';
import notifee, { AndroidImportance,AndroidBadgeIconType  } from '@notifee/react-native';

const Configure = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(false);
    const [switch3, setSwitch3] = useState(true);
    const [switch4, setSwitch4] = useState(true);
    const [switch5, setSwitch5] = useState(false);

    const openBatteryOptimizationSettings = () => {
        // let settingsURL;

        // if (Platform.OS === 'android') {
        //     settingsURL = 'battery optimization settings URL for Android';
        // } else if (Platform.OS === 'ios') {
        //     settingsURL = 'app-settings:';
        // }

        // if (settingsURL) {
        //     Linking.openSettings();
        // } else {
        //     console.error('Battery optimization settings URL not supported on this platform');
        // }

        Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please disable battery optimization for the app.',
            [
              // 3. launch intent to navigate the user to the appropriate screen
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

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Configure"} />
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={switch1 ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitch(1) }}
                        value={switch1}
                    />
                    <Text style={styles.mainText}>Notify the time to take the medicine</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={switch2 ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitch(2) }}
                        value={switch2}
                    />
                    <Text style={styles.mainText}>Open this app together with the medicine reminder</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={switch3 ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitch(3) }}
                        value={switch3}
                    />
                    <Text style={styles.mainText}>Notify appointment dates</Text>
                </View>
                <View style={styles.configureSideContainer}>
                    <Text style={styles.sideText}>You will be notified twice : 24 hours in advance, and 2 hours before the schedule time</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={switch4 ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitch(4) }}
                        value={switch4}
                    />
                    <Text style={styles.mainText}>Allow the app to run in the background</Text>
                </View>
                <View style={styles.configureSideContainer}>
                    <Text style={styles.sideText}>To recieve notification on time , enable the permisison</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={switch5 ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { toggleSwitch(5) }}
                        value={switch5}
                    />
                    <Text style={styles.mainText}>Allow the app to enable FaceID/Fingerprint Authentication</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("TermsAndConditions") }} style={styles.terms}><Text style={styles.termsText}>Terms & Conditions</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { deletAccount() }} style={styles.delete}><Text style={styles.deleteText}>Delete Account</Text></TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    },
    sideText: {
        color: config.primaryColor,
        width: '90%',
        marginLeft: '10%',
    },
});

export default Configure;
