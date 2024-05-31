import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoader from './ModalLoader';
const FingerAuth = ({ setShowFingerAuth }) => {
    const [authType, setAuthType] = useState('');
    const [error, setError] = useState('');
    const rnBiometrics = new ReactNativeBiometrics();
    const [showLoader, setShowLoader] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        authenticateWithBiometrics();
    }, []);

    const authenticateWithBiometrics = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint', cancelButtonText: 'Use Pattern' })
            .then((resultObject) => {
                const { success } = resultObject;
                if (success) {
                    // console.log('Successful biometrics provided');
                    getLoginResponse();

                } else {
                    setShowFingerAuth(false);
                    navigation.navigate("PatternAuth");
                }
            })
            .catch(() => {
                setShowFingerAuth(false);
                console.log('Biometrics failed');
            });
    };

    const getLoginResponse = async () => {
        setShowLoader(true);
        const { email, password } = await fetchLoginDetails();
        console.log(email,password);
        let data = qs.stringify({
            'grant_type': 'password',
            'username': email,
            'password': password
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/o/token/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            await AsyncStorage.setItem('loginResponse', JSON.stringify(response.data));
            await saveLoginDetails(email,password);
            setShowLoader(false);
            navigation.navigate("Dashboard");

        } catch (error) {
            setShowLoader(false);
            console.log(error);
        }
    }

    const saveLoginDetails = async (email,password) => {
        try {
            // Construct an object containing login details
            const loginDetails = {
                email: email,
                password: password
            };

            const jsonLoginDetails = JSON.stringify(loginDetails);

            await AsyncStorage.setItem('loginDetails', jsonLoginDetails);

            console.log('Login details saved successfully.');
        } catch (error) {
            console.error('Error saving login details:', error);
        }
    };

    const fetchLoginDetails = async () => {
        try {
            const jsonLoginDetails = await AsyncStorage.getItem('loginDetails');

            if (jsonLoginDetails !== null) {
                const loginDetails = JSON.parse(jsonLoginDetails);

                const { email, password } = loginDetails;

                return { email, password };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching login details:', error);
            return null;
        }
    };

    return (
        <>
            {showLoader && <ModalLoader />}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prompt: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default FingerAuth;
