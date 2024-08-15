import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import AlertIcon from '../components/AlertIcon';
import ValidationError from '../components/ValidationError';
import Snackbar from '../components/Snackbar';
import EmailIcon from '../assets/email.svg';
import ModalLoader from '../components/ModalLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Svg, { Path } from 'react-native-svg';
import qs from 'qs';
import DeleteAccountConfirmation from '../components/DeleteAccountConfirmation';
const DeleteAccount = ({ route }) => {
    const { email } = route.params;
    const navigation = useNavigation();
    const [username, setUsername] = useState(email);
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarKey, setSnackbarKey] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [emailExist, setEmailExist] = useState(true);
    const [ButtonText, setButtonText] = useState("DeleteAccount");
    const emailInputRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const passwordInputRef = useRef(null);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const handleLogin = () => {
        setUsernameError(false);
        setPasswordError(false);
        setInvalidEmail(false);
        setErrorMessage("");
        setSnackbarMessage('');
        if (!username) {
            setUsernameError(true);
            setErrorMessage("provide E-mail");
        }
        else if (!validateEmail(username)) {
            setInvalidEmail(true);
            setErrorMessage("Invalid email");
        }
        else if (!password) {
            setPasswordError(true);
            setErrorMessage("provide password");
        }
        else {
            toggleModal();
            // Login();
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
  

    const handleDelete = async () => {
        setShowLoader(true); 
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const email = responseObject.user.username;

        let data = qs.stringify({
            'username': email,
            'password': password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/o/delete-account',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error);
                handleShowSnackbar("Incorrect Password")
            })
            .finally(() => {
                toggleModal();
                setShowLoader(false);
            });
    }
    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    };

    const handleEmailBlur = () => {
        setIsEmailFocused(false);
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };


    const handleShowSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarKey((prevKey) => prevKey + 1);
    };



    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleRegister = () => {
        navigation.navigate('Signup')
    }

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }
    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            {showLoader && <ModalLoader />}
            <View style={styles.container}>
                <Image source={config.logo} style={styles.logo}></Image>
                <Image source={config.subLogo} style={styles.subLogo}></Image>
                <Text style={styles.login}>Delete Account</Text>
                <View style={styles.FormContainer}>
                    <View style={[styles.inputContainer, isEmailFocused && styles.focusedInput]}>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder="E-mail"
                            value={username}
                            onChangeText={(text) => setUsername(text.trim())}
                            onFocus={handleEmailFocus}
                            onBlur={handleEmailBlur}
                            placeholderTextColor="gray"
                            color="black"
                        />
                    </View>
                </View>


                <View style={{ width: '100%', right: 30, bottom: 0 }}>
                    {usernameError && !username && (
                        <>
                            <AlertIcon />
                            <ValidationError errorMessage={errorMessage} />
                        </>
                    )}
                </View>
                <View style={{ width: '100%', right: 30, bottom: 0 }}>
                    {invalidEmail && (
                        <>
                            <AlertIcon />
                            <ValidationError errorMessage={errorMessage} />
                        </>
                    )}
                </View>
                <>
                    <View style={[styles.FormContainer, { marginTop: 10 }]}>
                        <View style={[styles.inputContainer, isPasswordFocused && styles.focusedInput]}>
                            <TextInput
                                style={styles.inputPassword}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={true}
                                onChangeText={setPassword}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                placeholderTextColor="gray"
                                color="black"
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', right: 30, bottom: 0 }}>
                        {passwordError && !password && (
                            <>
                                <AlertIcon />
                                <ValidationError errorMessage={errorMessage} />
                            </>
                        )}
                    </View>
                </>


                {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
                <TouchableOpacity
                    style={
                        styles.loginButton
                    }
                    onPress={handleLogin}
                >
                    <Text style={{ color: config.tertiaryColor, textAlign: 'center', fontSize: PixelRatio.getFontScale() * 17 }}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.register}>Register</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={styles.container}>
      
      </View>  */}
            {/* <View style={styles.container}></View> */}
            <DeleteAccountConfirmation isVisible={isModalVisible} toggleModal={toggleModal} Modalfor={"DeleteAccount"} Confirm={handleDelete} />

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        // paddingTop: 20,
        marginTop: '20%'
    },
    title: {
        fontSize: 24,
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
        color: 'grey',
    },
    register: {
        paddingTop: '15%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 16
    }
});

export default DeleteAccount;
