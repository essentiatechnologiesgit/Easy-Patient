import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, BackHandler, Alert, Platform } from 'react-native';
import config from '../../config.mjs';
import { useNavigation } from '@react-navigation/native';
import AlertIcon from '../components/AlertIcon';
import ValidationError from '../components/ValidationError';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ValidationMessageError from '../components/ValidationMessageError';
import CustomButton from '../components/CustomizedButton';
import FingerPrint from '../components/FingerAuth';
import cross from '../assets/cross.png';
import qs from 'qs';
const PasswrodError = () => {
    const navigation = useNavigation();
    const handleNavigation = () =>{
        navigation.navigate('Login')
    }

    handleForgetPassword = () =>{
        navigation.navigate('ForgotPassword')
    }
    return (
        <>
            <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Image source={config.logo} style={styles.logo}></Image>
                    <Image source={config.subLogo} style={styles.subLogo}></Image>
                    
                    
                    <Text style={styles.title}>Incorrect Password</Text>
                    <Image source={cross} style={styles.cross}></Image>
                    <Text style={styles.para}>We found an Error with your password.Please re-enter or request a new password</Text>

                    <TouchableOpacity style={{ width: '100%', marginTop: 50 }}>
                        <CustomButton onPress={() => {handleNavigation()}} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={config.buttonText} text={"Try again"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forgotPassword} onPress={()=>{handleForgetPassword()}}>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        ...Platform.select({
            ios: {
                // justifyContent: 'center',
                marginTop: 100,
                gap: 5,
            },
            android: {
                paddingTop: 20,
                marginTop: '20%',
                justifyContent: 'top',
            },
        })
    },
    para:{
        marginTop: 50,
        fontSize: 15,
        marginBottom: 20,
    },
    cross:{
        height:30,
        width:30,
        marginTop:5,
    },
    title: {
        marginTop: 50,
        fontSize: 18,
        marginBottom: 20,
    },
    FormContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
        borderBottomWidth: 2,
        width: '90%',
    },
    icon: {
        marginBottom: -8,
        marginRight: 2,
    },
    iconkey: {
        marginBottom: -2,
    },
    inputEmail: {
        flex: 1,
        marginBottom: -8,
        paddingLeft: 8,
        height: 40,
        fontSize: PixelRatio.getFontScale() * 17,
        color: 'red',
    },
    inputPassword: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        marginBottom: -5,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    focusedInput: {
        borderBottomWidth: 3,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    logo: {
        height: 58,
        borderColor: '#fff',
        resizeMode: 'contain',
        zIndex: 999,
    },
    subLogo: {
        height: 19,
        width: 180,
        marginTop: 10,
    },
    login: {
        fontWeight: 'bold',
        fontSize: PixelRatio.getFontScale() * 20,
        marginTop: '5%',
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
        fontSize: PixelRatio.getFontScale() * 17,
        backgroundColor: config.secondaryColor, // Set background color directly
    },

    forgotPassword: {
        justifyContent: 'flex-end',
        width: '90%',
        marginTop: 20,
    },
    forgotPasswordText: {
        textDecorationLine: 'underline',
        textAlign: 'right',
        fontSize: PixelRatio.getFontScale() * 15,
        color: config.primaryColor,
    },
    register: {
        paddingTop: '15%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 16,
        marginBottom: 10,
    }
});

export default PasswrodError;
