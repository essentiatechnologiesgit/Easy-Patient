import React, { useEffect, useRef, useState } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, BackHandler } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import BellAlarm from '../components/BellAlarm';
import CrossAlarm from '../components/CrossAlarm';
import CrossBell from '../components/CrossBell';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import ImageLogo from '../components/ImageLogo'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import Snackbar from '../components/Snackbar';
import Medications from '../components/Medications';
const Dashboard = () => {
    const navigation = useNavigation();
    const [backPressed, setBackPressed] = useState(false);
    const route = useRoute();
    const [name, setName] = useState('');
    const [healthInfo, setHealthInfo] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [alarmComponents, setAlarmComponents] = useState([]);
    const [image, setImage] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const isFocused = useIsFocused();
    const [snackbarKey, setSnackbarKey] = useState(0);
    const [userId, setUserId] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            await getLoginResponse();
            // await renderAlarmComponents();
   
        };
        fetchData();

    }, [isFocused]);

    useEffect(()=>{
        if (userId !== 0) {
            renderTimeComponents(userId);
          }
    },[userId])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await getLoginResponse();
    //         renderTimeComponents();
    //     };
    //     fetchData();
    // }, [route]);


    const [backPressedOnce, setBackPressedOnce] = useState(false);
    const backPressedOnceRef = useRef(backPressedOnce);

    useEffect(() => {
        backPressedOnceRef.current = backPressedOnce;
    }, [backPressedOnce]);

    useEffect(() => {
        const backAction = () => {
            if (backPressedOnceRef.current) {
                BackHandler.exitApp();
            } else {
                setBackPressedOnce(true);
                handleShowSnackbar("Press Back again to exit");

                setTimeout(() => {
                    setBackPressedOnce(false);
                }, 2000); // Reset after 2 seconds
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    const handleShowSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarKey((prevKey) => prevKey + 1);
    };

    const getLoginResponse = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = await  JSON.parse(loginResponse);
        setName(responseObject.user.full_name);
        setUserId(responseObject.user.user_id);
        const access_token = responseObject.access_token;
        setImage(responseObject.user.profile_pic);
        getHealthCheck(access_token);
    }

    const getHealthCheck = async (access_token) => {
        let config = {
            method: 'get',
            url: 'https://api-patient-dev.easy-health.app/patient/health-data',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        };
        await axios.request(config)
            .then((response) => {
                if (response.data.length > 0) {
                    setHealthInfo(true);
                } else {
                    setHealthInfo(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const renderTimeComponents = async () => {
       
   try {
            const allAlarmComponents = [];
            const AlarmsArrayJSON = await AsyncStorage.getItem('Alarms');
            const AlarmsArray = AlarmsArrayJSON ? JSON.parse(AlarmsArrayJSON) : [];

            // Define the userId you want to check for


            if (AlarmsArray && AlarmsArray.length > 0) {
                // Get today's date in 'YYYY-MM-DD' format
                const today = moment().format('YYYY-MM-DD');

                // Filter alarms for the current day and their times, and check if userId exists
                const currentDayAlarms = AlarmsArray.filter(alarm => {
                    return alarm.user_id === userId && alarm.times && alarm.times.some(timeObj => {
                        const alarmDateTime = moment(timeObj.time, 'YYYY-MM-DD HH:mm');
                        return alarmDateTime.isSame(today, 'day');
                    });
                }).map(alarm => {
                    return {
                        ...alarm,
                        times: alarm.times.filter(timeObj => {
                            const alarmDateTime = moment(timeObj.time, 'YYYY-MM-DD HH:mm');
                            return alarmDateTime.isSame(today, 'day');
                        })
                    };
                });

                // Flatten all times for sorting
                const allTimes = currentDayAlarms.reduce((acc, alarm) => {
                    if (alarm.times) {
                        return acc.concat(alarm.times.map(timeObj => ({ ...timeObj, ...alarm })));
                    }
                    return acc;
                }, []);

                // Sort all times
                allTimes.sort((a, b) => {
                    return moment(a.time, 'YYYY-MM-DD HH:mm').diff(moment(b.time, 'YYYY-MM-DD HH:mm'));
                });

                // Generate alarm components for sorted times
                allTimes.forEach((timeObj, index) => {
                    const { time, id: timeId, taken, medicine, id, dosage } = timeObj;
                    const alarmTime = moment(time, 'YYYY-MM-DD HH:mm');
                    const remainingTime = alarmTime.diff(moment(), 'minutes');

                    let alarmComponent;
                    // Check if this is the next upcoming alarm
                    if (remainingTime > 0 && !allTimes.some((otherTime) => moment(otherTime.time, 'YYYY-MM-DD HH:mm').isBetween(moment(), alarmTime))) {
                        alarmComponent = (
                            <CrossBell
                                remainingTime={remainingTime}
                                time={alarmTime.format('HH:mm')}
                                id={timeId}
                                dosage={dosage}
                                Medicine={medicine}
                                medicineId={id}
                                taken={taken}
                                reloadFunction={renderTimeComponents}
                            />
                        );
                    } else if (alarmTime.isSame(moment(), 'minute')) {
                        alarmComponent = (
                            <CrossBell
                                remainingTime={remainingTime}
                                time={alarmTime.format('HH:mm')}
                                id={timeId}
                                dosage={dosage}
                                Medicine={medicine}
                                medicineId={id}
                                taken={taken}
                                reloadFunction={renderTimeComponents}
                            />
                        );
                    } else {
                        // Check if the alarm is in the past
                        if (alarmTime.isBefore(moment())) {
                            alarmComponent = (
                                <CrossAlarm
                                    time={alarmTime.format('HH:mm')}
                                    medicineId={id}
                                    id={timeId}
                                    Medicine={medicine}
                                    taken={taken}
                                    reloadFunction={renderTimeComponents}
                                />
                            );
                        } else {
                            // Default case: future alarm
                            alarmComponent = (
                                <BellAlarm
                                    time={alarmTime.format('HH:mm')}
                                    id={timeId}
                                    Medicine={medicine}
                                    medicineId={id}
                                    taken={taken}
                                    reloadFunction={renderTimeComponents}
                                />
                            );
                        }
                    }

                    // Add the generated alarm component to the list
                    allAlarmComponents.push({ time: alarmTime.format('HH:mm'), component: alarmComponent });
                });

                // Render components
                const components = allAlarmComponents.map((item, index) => (
                    <View style={styles.component} key={index}>
                        {item.component}
                    </View>
                ));

                // Update state with rendered components
                setAlarmComponents(components);
            }
        } catch (error) {
            console.error('Error rendering alarm components:', error);
        }
    };


    const handleRefresh = async () => {
        setRefreshing(true);
        try {

            // await AsyncStorage.setItem('Alarms', JSON.stringify(""));
            renderTimeComponents();
        } catch (error) {
            console.error('Error refreshing medicines:', error);
        } finally {
            setRefreshing(false);
        }
    };
    const props = {
        activeStrokeWidth: 11,
        inActiveStrokeWidth: 11,
        inActiveStrokeOpacity: 0.2
    };

    return (
        <>
            <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                >
                    <View style={styles.headerContainer}>

                        <Image source={config.logo} style={styles.logo} />
                        {
                            image &&
                            <>
                                <ImageLogo imageURI={image} name={name} healthInfo={healthInfo} />
                            </>
                        }
                        {
                            !image &&
                            <>
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <CircularProgressBase
                                        {...props}
                                        value={healthInfo === false ? 30 : 100}
                                        radius={26}
                                        activeStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                                        inActiveStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('ProfileAndHealth', { imageURI: image, name: name, healthInfo: healthInfo })} style={styles.profileButton}>
                                    <Image source={profileIcon} style={styles.ProfileLogo} />
                                </TouchableOpacity>
                            </>
                        }

                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameHeading}>Hello {name}!</Text>
                        <Text style={styles.nameSideHeading}>Welcome to Easy Patient</Text>
                    </View>


                    <View style={styles.parentView}>
                        {/* <Text style={styles.heading}>Notifications</Text>
                    <View style={styles.NotificationContainer}>
                        <Image source={goodHealth} style={styles.healthIcon} />
                        <Text style={styles.reminder}>Dr Ahmed sent you a package of reminders</Text>
                    </View> */}
                        <View style={styles.sliderContainer}>
                            <FolderSlider />
                        </View>
                        <Text style={styles.heading}>Todays Medications</Text>
                        {
                            !alarmComponents.length > 0 &&
                            <View style={styles.component}>
                                <Medications />
                            </View>
                        }
                        {
                            alarmComponents.map((component, index) => (
                                <View style={styles.component} key={index}>
                                    {component}
                                </View>
                            ))
                        }

                    </View>

                </ScrollView>

                <Footer prop={0} />

            </ImageBackground>
            <View style={{ alignItems: 'center', bottom: 100 }}>
                {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    component: {
        marginBottom: 8,
    },
    reminder: {
        // textAlign: 'center',
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    sliderContainer: {
        minHeight: 170,
        marginLeft: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    profileButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthIcon: {
        height: 30,
        width: 30,
    },
    NotificationContainer: {
        flexDirection: 'row',
        height: 90,
        width: '90%',
        alignSelf: 'center',
        padding: 25,
        gap: 15,
        backgroundColor: config.modalColor,
        borderRadius: 8,
        marginBottom: 20,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        marginLeft: 16,
        marginTop: -5,
    },
    nameHeading: {
        fontWeight: '600',
        fontSize: PixelRatio.getFontScale() * 24,
        color: config.textColorHeadings,
        fontFamily:config.fontStyle,
    },
    logo: {
        width: '10%',
        resizeMode: 'contain',
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
        marginBottom: 15,
        marginTop: -5,
        fontWeight: '600',  // semi-bold
        marginLeft: 16,
        fontFamily:config.fontStyle,
    },
    ProfileLogo: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
    },
    headerContainer: {
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginTop: 40,
            },
        }),
    },
    nameSideHeading: {
        fontSize: PixelRatio.getFontScale() * 20,
        color: config.textColorHeadings,
        fontFamily:config.fontStyle,
    },
    parentView: {
        marginTop: '6%',
    },
});

export default Dashboard;
