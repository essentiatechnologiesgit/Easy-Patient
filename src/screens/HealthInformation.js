import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground, ScrollView, PixelRatio, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import ModalLoader from '../components/ModalLoader';
import user from '../assets/user.png';
import goodHealth from '../assets/good-health.png';
import profileSync from '../assets/profile-sync.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomizedButton';
import BackHeader from '../components/backHeader';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
const HealthInformation = () => {
    const route = useRoute();
    const isChanged = route.params?.isChanged;
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [name, setFullName] = useState('');
    const errorRefs = useRef([]);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    //validation feilds
    const [showLoader, setShowLoader] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [steps, setSteps] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [MovementTime, setMovementTime] = useState('');
    const [waiting, setWaiting] = useState('');
    const [exercise, setExercise] = useState('');
    const [energy, setEnergy] = useState('0.844000000000001');
    const [resting, setResting] = useState('');
    const [emptyHeight, setEmptyHeight] = useState(false);
    const [emptyWeight, setEmptyWeight] = useState(false);
    const [userId, setUserId] = useState('');
    const [dataId, setDataId] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newHeight , setNewHeight] = useState('');


    useEffect(() => {

        configureGoogleSignIn();
        googleLogin();
        saveData();
        getWeights();

        // const fetchData = async () => {
        //     const access_token = await getAccessToken();
        //     await getData(access_token);
        // };

        // if(!heartRate.length>0 || !height.length>0 || !weight.length>0 || !steps.length>0 || !heartRate.length>0|| !bloodPressure.length>0){
        //    fetchData();
        // }

    }, []);

    const saveData = async () => {
        // const opt = {
        //     value: 200,
        //     date: new Date().toISOString(),
        //     unit: "pound"
        //   };

        //   GoogleFit.saveWeight(opt, (err, res) => {
        //     if (err) throw "Cant save data to the Google Fit";
        //     console.log("result",res);
        //   });
        //   const weightSamples = await GoogleFit.getWeightSamples(opt);
        //   console.log(weightSamples);

        // const heightInMeters = 1.80; // Replace with your user's height in meters

        // const opt = {
        //   value: heightInMeters,
        //   date: new Date().toISOString(),// Start time of the height measurement (optional)
        // };

        // GoogleFit.saveHeight(opt, (err, res) => {
        //   if (err) {
        //     console.error("Error saving height data:", err);
        //   } else {
        //     console.log("Height data saved successfully:", res);
        //   }
        //   console.log(res);
        // });
   
    

    }


    const configureGoogleSignIn = async () => {
        await GoogleSignin.configure({
            forceCodeForRefreshToken: true,
        });
    };

    const getAccessToken = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        setUserId(responseObject.user.user_id);
        const access_token = responseObject.access_token;
        setAccessToken(access_token);
        return access_token;
    }

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.user.email) {
                handleGoogleFitAuthorization(userInfo.user.email);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Sign in cancelled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Sign in is in progress already");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Play services not available or outdated");
            } else {
                console.log("Error occurred during sign in", error);
            }
        }
    };

    const handleDataSave = () => {
        setEmptyHeight(false);
        setEmptyWeight(false);
        setErrorMessage('');

        if (!height) {
            setEmptyHeight(true);
            setErrorMessage('Reuired feilds')
        }
        else if (!weight) {
            setEmptyWeight(true);
            setErrorMessage('Reuired feilds')
        } else {
            if (dataId) {
                UpdateData()
            } else {
                SaveData();
            }
        }
    }
  
    const getData = async (access_token) => {
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
                    setHeight(response.data[0].height);
                    setWeight(response.data[0].weight);
                    setEnergy(response.data[0].active_energy);
                    setResting(response.data[0].resting_energy);
                    setMovementTime(response.data[0].move_time_in_minutes);
                    setWaiting(response.data[0].stand_hours);
                    setHeartRate(response.data[0].heart_rate);
                    setExercise(response.data[0].exercise_time_in_minutes);
                    setSteps(response.data[0].daily_steps);
                    setDataId(response.data[0].id);
                    setBloodPressure(response.data[0].blood_pressure);
                } else {
                    console.log(`No data found for userId ${userId}`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const UpdateData = () => {
        let data = JSON.stringify({
            "id": dataId,
            "height": height,
            "weight": weight,
            "heart_rate": heartRate,
            "daily_steps": steps,
            "exercise_time_in_minutes": exercise,
            "move_time_in_minutes": MovementTime,
            "stand_hours": waiting,
            "active_energy": energy,
            "resting_energy": resting,
            "blood_pressure": bloodPressure,
            "is_smoker": 1
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/patient/health-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };
        console.log(data);
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                navigation.goBack();
            });
    }

    const getAuthorization = () => {
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_BODY_WRITE,
                Scopes.FITNESS_BLOOD_PRESSURE_READ,
                Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
                Scopes.FITNESS_BLOOD_GLUCOSE_READ,
                Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
                Scopes.FITNESS_NUTRITION_WRITE,
                Scopes.FITNESS_SLEEP_READ,
            ],
        };
        GoogleFit.checkIsAuthorized().then(() => {
            var authorized = GoogleFit.isAuthorized;
            // console.log(authorized);
            if (authorized) {
                // console.log("get Authorized")
            } else {
                GoogleFit.authorize(options)
                    .then(authResult => {
                        if (authResult.success) {
                            console.log('AUTH_SUCCESS');
                        } else {
                            console.log('AUTH_DENIED ' + authResult.message);
                        }
                    })
                    .catch(() => {
                        dispatch('AUTH_ERROR');
                    });
            }
        });

    }

    async function handleGoogleFitAuthorization(selectedAccount) {
        if (!selectedAccount) {
            console.error("Please select a Google account to proceed");
            return;
        }

        const isAuthorized = await GoogleFit.checkIsAuthorized();

        if (isAuthorized) {
            console.log("Google Fit already authorized");
        } else {
            const authResult = await GoogleFit.authorize({
                scopes: [/* Your Scopes here */],
            });
            if (authResult.success) {
                   await getWeights();
                // getSteps();
            } else {
                console.log("Authorization failed:", authResult.message);
            }
        }
    }


    const handleSync = async () => {
        await GoogleSignin.signOut();
        googleLogin();


        const fetchData = async () => {
            const access_token = await getAccessToken();

            await getData(access_token);
        };

        fetchData();
    }

    const getWeights = async () => {
        const opt = {

            date: new Date().toISOString(),
            unit: "pound"
        };

        try {
            const weightSamples = await GoogleFit.getWeightSamples(opt);
            // console.log("Weights", weightSamples[0].value);
            if (weightSamples.length > 0) {
                setWeight(String(weightSamples[0].value));
            }

            

            const heightSamples = await GoogleFit.getHeightSamples(opt);
            // console.log("Heights", heightSamples);
            if (heightSamples.length > 0)
                setHeight(String(heightSamples[0].value));

            const activeMinutes = await GoogleFit.getMoveMinutes(opt);
            // console.log("Active Minutes ",activeMinutes);
            if (activeMinutes.length > 0)
                setMovementTime(String(activeMinutes[0].duration));

            const stepCountSamples = await GoogleFit.getDailyStepCountSamples(opt);
            // console.log('Daily steps >>> ', stepCountSamples[0].steps);
            if (stepCountSamples[0].steps.length > 0)
                setSteps(String(stepCountSamples[0].steps));
            // console.log("stepCountSamples",stepCountSamples[0].steps.length)

            const heartRateSamples = await GoogleFit.getHeartRateSamples(opt);
            // console.log("Heart rate", heartRateSamples);
            if (heartRateSamples.length > 0)
                setHeartRate(String(heartRateSamples[0].value));



        } catch (err) {
            console.warn(err);
        }
    }




    const SaveData = () => {
        let data = JSON.stringify({
            "height": height,
            "weight": weight,
            "heart_rate": heartRate,
            "daily_steps": steps,
            "exercise_time_in_minutes": exercise,
            "move_time_in_minutes": MovementTime,
            "stand_hours": waiting,
            "active_energy": energy,
            "resting_energy": resting,
            "blood_pressure": bloodPressure,
            "is_smoker": 1
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/patient/health-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };
        console.log(config);
        axios.request(config)
            .then((response) => {
                console.log("Data here", JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                navigation.goBack();
            });
    }

    return (
        <>
            <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
                <BackHeader name={"Health Information"} />
                <TouchableOpacity onPress={() => handleSync()} style={styles.SyncButton}>
                    <Image source={profileSync} style={styles.Profilelogo} />
                </TouchableOpacity>
                <ScrollView ref={scrollViewRef} style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={styles.signupFormContainer}>
                        <Text style={styles.requiredText}>Required feilds</Text>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Height (centimeter)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={emptyHeight ? styles.customLabelStylesEmpty : styles.customLabelStyles}
                                value={height}
                                onChangeText={value => setHeight(value)}
                                containerStyles={styles.containerStyles}
                            />
                            {emptyHeight && !height && (
                                <>
                                    <Text style={styles.error}>Required feilds</Text>
                                </>
                            )}
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Weight (kilogram)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={emptyWeight ? styles.customLabelStylesEmpty : styles.customLabelStyles}
                                value={weight}
                                onChangeText={value => setWeight(value)}
                                containerStyles={styles.containerStyles}
                            />
                            {emptyWeight && !weight && (
                                <>
                                    <Text style={styles.error}>Required feilds</Text>
                                </>
                            )}
                        </View>
                        <Text style={styles.otherText}>Other feilds</Text>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Steps (count)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={steps}
                                onChangeText={value => setSteps(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Heart rate (bpm)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={heartRate}
                                onChangeText={value => setHeartRate(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Movement Time'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={MovementTime}
                                onChangeText={value => setMovementTime(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Waiting hours'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={waiting}
                                onChangeText={value => setWaiting(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Exercise time (minute)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={exercise}
                                onChangeText={value => setExercise(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Active energy (calories)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={energy}
                                onChangeText={value => setEnergy(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Resting Energy (calories)'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={resting}
                                onChangeText={value => setResting(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Blood Pressure'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={bloodPressure}
                                onChangeText={value => setBloodPressure(value)}
                                containerStyles={styles.containerStyles}
                            />
                        </View>
                        <View style={{ width: '100%', marginTop: 40, marginBottom: 50 }}>
                            <CustomButton onPress={() => handleDataSave()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                        </View>
                    </View>
                </ScrollView>

                {showLoader && <ModalLoader />}

            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    ProfilesContainer: {
        gap: 20,
    },
    SyncButton: {
        backgroundColor: config.secondaryColor,
        height: 30,
        width: 30,
        borderRadius: 15,
        position: 'absolute',
        top: 20,
        right: 15,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileParent: {

    },
    requiredText: {
        fontSize: PixelRatio.getFontScale() * 20,
        color: config.textColorHeadings,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 15,
        marginBottom: 15,
    },
    otherText: {
        fontSize: PixelRatio.getFontScale() * 20,
        color: config.textColorHeadings,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 5,
        marginBottom: 15,
    },
    percent: {
        fontSize: PixelRatio.getFontScale() * 12,
        color: config.textColorHeadings,
    },
    greenCircle: {
        backgroundColor: '#32de84',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    redCircle: {
        backgroundColor: '#9e1b32',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    Percentage: {
        backgroundColor: 'white',
        height: 20,
        width: 50,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#9e1b32',
        borderWidth: 1,
        marginLeft: 28,
        top: -10,
    },
    FHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    SHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
        fontWeight: 'bold',
    },
    THeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
        width: '70%',
    },
    TLHeading: {
        fontSize: PixelRatio.getFontScale() * 14,
        color: config.primaryColor,
        width: '70%',
    },
    bothContainers: {
        backgroundColor: 'white',
        height: 100,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        elevation: 8,
        flexDirection: 'row',
        padding: 10,
        gap: 15,
        overflow: 'hidden',
    },
    arrow: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        textAlign: 'right',
    },
    Profilelogo: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        borderColor: config.secondaryColor,
        left: 1,
    },
    error: {
        color: 'red',
        fontSize: PixelRatio.getFontScale() * 16,
        marginTop: 10,
        marginLeft: 5,
    },
    userIcon: {
        height: 20.6,
        width: 20,
        top: 6,
    },
    name: {
        fontSize: PixelRatio.getFontScale() * 19,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    msg: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,

    },
    complete: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        gap: 24,
        width: '80%',
        position: 'absolute',
        padding: 35,
    },
    icon: {
        marginBottom: -8,
        marginRight: 2,
    },
    focusedInput: {
        borderBottomWidth: 3,
    },
    OTPContainer: {
        marginTop: 50,
    },
    codeText: {
        fontSize: PixelRatio.getFontScale() * 17,
        textAlign: 'center',
        color: 'gray',
    },
    label: {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.primaryColor,
        zIndex: 1,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        lineHeight: PixelRatio.getFontScale() * 20,
    },
    labelFloating: {
        top: -PixelRatio.getFontScale() * 4,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    dropdownPicker: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: config.secondaryColor,
    },
    dropdownTextStyle: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 10,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'left',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalItem: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    signupContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    signupFormContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        flexDirection: 'column',
    },

    FocusStyling: {
        color: config.primaryColor,
    },

    backLink: {
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.secondaryColor,
        textDecorationLine: 'underline',
        marginTop: 30,
        marginBottom: 30,
    },
    inputContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
        borderBottomWidth: 2,
        width: '90%',
    },
    inputPassword: {
        marginTop: 10,
        height: 40,
        borderWidth: 0,
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        width: '90%',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    logo: {
        borderColor: '#fff',
        resizeMode: 'contain',
        zIndex: 999,
    },
    subLogo: {
        marginTop: 15,
    },

    signup: {
        fontWeight: 'bold',
        fontSize: PixelRatio.getFontScale() * 20,
        marginTop: '6%',
        color: config.textColorHeadings,
    },
    loginButton: {
        width: '90%',
        height: 40,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        color: config.secondaryColor,
        borderColor: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        // backgroundColor: 'rgba(0,0,0,0)', // Set background color directly
    },
    forgotPassword: {
        justifyContent: 'flex-end',
        textDecorationLine: 'underline',
        width: '90%',
        textAlign: 'right',
        marginTop: 20,
        fontSize: PixelRatio.getFontScale() * 17
    },
    login: {
        paddingTop: '15%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 15,

    },
    checkbox: {
        marginTop: '4%',
        width: '90%',
        justifyContent: 'left',
        textAlign: 'left',
        flexDirection: 'row'
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 17,
        padding: 2,
        color: config.secondaryColor,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    textt: {
        fontSize: PixelRatio.getFontScale() * 17,
        padding: 2,
        color: 'gray',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    label: {
        position: 'absolute',
        left: 10,
        top: 10,
        fontSize: 16,
        color: config.primaryColor,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: config.primaryColor,
        borderRadius: 5,
        fontSize: 16,
    },
    floatingLabel: {
        marginBottom: 20,
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        flex: 1
    },
    containerStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        borderWidth: 0,
        height: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: config.secondaryColor
    },
    customLabelStyles: {
        colorFocused: config.secondaryColor,
        colorBlurred: config.primaryColor,
        fontSizeFocused: PixelRatio.getFontScale() * 14,
        fontSizeBlurred: PixelRatio.getFontScale() * 17,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginVertical: 0
    },
    customLabelStylesEmpty: {
        colorFocused: 'red',
        colorBlurred: config.primaryColor,
        fontSizeFocused: PixelRatio.getFontScale() * 14,
        fontSizeBlurred: PixelRatio.getFontScale() * 17,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginVertical: 0
    },
    inputStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: 20,
        color: config.textColorHeadings,
    }
});

export default HealthInformation;
