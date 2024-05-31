import React, { useEffect, useState } from 'react';
import { View, Text, PixelRatio } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GesturePassword from 'react-native-gesture-password';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLoader from '../components/ModalLoader';
import axios from 'axios';
import qs from 'qs';
const PatternAuth = ({ }) => {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [status, setStatus] = useState('normal');
    const [message, setMessage] = useState('Please input your password.');
    const [showLoader , setShowLoader ] = useState(false);
    const handleOnSetPassword = (newPassword) => {
        console.log('Password set (for demonstration only, replace with secure storage):', newPassword); // Replace with secure storage
        setPassword(newPassword); // Store hashed password in state (temporary)
        setStatus('right');
        setMessage('Password is set.');
        addPassword(newPassword);
        console.warn("done");
    };

    const handleOnVerifyPassword = async (typedPassword) => {
        // Compare the typed password with the securely stored and hashed password (**crucial**)
        const storedPassword = await getPassword();
        if (typedPassword === storedPassword) { // Replace with secure comparison
            setStatus('right');
            setMessage('Password is correct.');
            handleLogin()

        } else {
            setStatus('wrong');
            setMessage('Password is incorrect. Try again.');
        }
    };

    const handleLogin = async () => {
        setShowLoader(true);
        const { email, password } = await fetchLoginDetails();
        console.log(email, password);
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
            await saveLoginDetails(email, password);
            setShowLoader(false);
            navigation.navigate("Dashboard");

        } catch (error) {
            setShowLoader(false);
            console.log(error);
        }
    }

    const saveLoginDetails = async (email, password) => {
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

    const getPassword = async () => {
        try {
            const storedPassword = await AsyncStorage.getItem('password');

            if (storedPassword !== null) {

                return storedPassword;
            }
        } catch (error) {
            console.error('Error getting password from AsyncStorage:', error);
        }
    }


    const handleOnReset = () => {
        setStatus('normal');
        setMessage('Please input your password.');
    };


    const addPassword = async (newPassword) => {
        try {
            await AsyncStorage.setItem('password', newPassword);
        } catch (error) {
            console.error('Error adding password to AsyncStorage:', error);
        }
    };



    const styles = {
        container: {
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000', // Set background color (optional)
        },
        heading: {
            color: '#fff',
            fontSize: 20,
            marginTop: 50,
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        cell: {
            width: 20,
            height: 20,
            borderRadius: 25, // Set dot size and shape
            margin: 0,
            backgroundColor: 'white', // Remove default background
            alignItems: 'center',
            justifyContent: 'center',
        },
        cellSelected: {
            backgroundColor: '#fff', // White for selected dots
        },
        line: {
            width: 2,
            height: 'auto',
            backgroundColor: '#fff', // White for line
        },
    };
    return (
        <>
            <View style={styles.container}>
                {showLoader && <ModalLoader />}
                <Text style={styles.heading}>Authenticate Connect </Text>
                <GesturePassword
                    onSetPassword={handleOnSetPassword}
                    textStyle={{ marginTop: 60, color: 'white' }}
                    style={{ width: '100%', backgroundColor: 'black', }}
                    outerCircleStyle={{ backgroundColor: 'white', }} 
                    innerCircleStyle={{ backgroundColor: 'white', }} 
                    outerCircle={false}
                    status={status}
                    message={message}
                    rightColor='green'
                    normalColor='white'
                    onStart={() => setStatus('normal')} 
                    onEnd={
                        getPassword() === ''
                            ? handleOnSetPassword
                            : handleOnVerifyPassword 
                    }
                    onReset={handleOnReset}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ height: 100, width: '100%' }}><Text style={{ color: 'white', fontSize: PixelRatio.getFontScale() * 17, }}>Cancel</Text></TouchableOpacity>

            </View>
        </>
    );
};

export default PatternAuth;
