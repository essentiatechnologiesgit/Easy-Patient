import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, Platform } from 'react-native';
import config from '../../config.mjs';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import ValidationMessageError from '../components/ValidationMessageError';
import axios from 'axios';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import CustomButton from '../components/CustomizedButton';
const ChangePassword = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const [perror, setPError] = useState(false);
    const [cperror, setCPError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [errorMessage, setErrorMsg] = useState('');
    const [PLError, setPLError] = useState(false);
    const [CPLError, setCPLError] = useState(false);
    const [IOSError, setIOSError] = useState(false);
    const handleConfirm = async () => {
        setErrorMsg('');
        setCPError(false);
        setPError(false);
        setCPLError(false);
        setPLError(false);
        setIOSError(false);
        if (!password) {

            if (Platform.OS === 'android') {
                setPError(true);
                setErrorMsg('Enter password');
            }
            else {
                setIOSError(true);
                setErrorMsg('Please enter a password');
            }
        }
        else if (password.length < 5) {
            if (Platform.OS === 'android') {
                setPLError(true);
                setErrorMsg('Password length should be more than 5');
            } else {
                setIOSError(true);
                setErrorMsg('Password length should be more than 5');
            }

        }
        else if (!Cpassword) {
            if (Platform.OS === 'android') {
                setCPError(true);
                setErrorMsg('Enter confirmation password');
            } else {
                setIOSError(true);
                setErrorMsg('Please enter confirm password');
            }
        }
        else if (Cpassword.length < 5) {
            if (Platform.OS === 'android') {
                setCPLError(true);
                setErrorMsg('Confirm Password length should be more than 5');
            } else {
                setIOSError(true);
                setErrorMsg('Confirm Password length should be more than 5');
            }
        }
        else if (password != Cpassword) {
            if(Platform.OS === 'android'){
                setCPLError(true);
                setErrorMsg('Password confirmation does not match the new password');
            }else{
                setIOSError(true);
                setErrorMsg('Password confirmation does not match the new password');
            }
        }
        else {
            setShowLoader(true);
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            const responseObject = JSON.parse(loginResponse);
            const access_token = responseObject.access_token;

            let data = qs.stringify({
                'new_password': password
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://api-patient-dev.easy-health.app/o/change-password',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${access_token}`
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    navigation.navigate("Profile");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setShowLoader(false);
                });
        }
    }

    return (
        <>
            <View style={styles.container}>
                <ValidationMessageError visible={IOSError} msg={errorMessage} setVisible={setIOSError} />
                <BackHeader name={"Change Password"} />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={styles.signupFormContainer}>
                        <View
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'New Password'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={password}
                                isPassword={true}
                                onChangeText={value => setPassword(value)}
                                containerStyles={styles.containerStyles}
                            />
                            {perror && !password && (
                                <>
                                    <AlertIcon />
                                    <ValidationError errorMessage={errorMessage} />
                                </>
                            )}
                            {PLError && (
                                <>
                                    <AlertIcon />
                                    <ValidationError errorMessage={errorMessage} />
                                </>
                            )}
                        </View>
                        <View
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Confirm Password'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={styles.customLabelStyles}
                                value={Cpassword}
                                isPassword={true}
                                onChangeText={value => setCPassword(value)}
                                containerStyles={styles.containerStyles}
                            />
                            {cperror && !Cpassword && (
                                <>
                                    <AlertIcon />
                                    <ValidationError errorMessage={errorMessage} />
                                </>
                            )}
                            {CPLError && (
                                <>
                                    <AlertIcon />
                                    <ValidationError errorMessage={errorMessage} />
                                </>
                            )}
                        </View>
                    </View>

                    <View style={{ width: '94%', marginTop: 35 }}>
                        <CustomButton onPress={() => { handleConfirm() }} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                    </View>
                </ScrollView>
                {showLoader && <ModalLoader />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    inputStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: 20,
        color: config.textColorHeadings,
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
    floatingLabel: {
        marginBottom: 20,
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        flex: 1
    },
    signupFormContainer: {
        flex: 1,
        width: '94%',
        height: '100%',
        // alignItems: 'center',
        marginTop: 30,
        flexDirection: 'column',
    },

});

export default ChangePassword;
