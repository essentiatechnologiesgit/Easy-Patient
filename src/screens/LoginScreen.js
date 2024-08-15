import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, BackHandler, Alert, Platform } from 'react-native';
import config from '../../config.js';
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
import Dialog from "react-native-dialog";
import qs from 'qs';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
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
  const [ButtonText, setButtonText] = useState('Next');
  const [showFingerAuth, setShowFingerAuth] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [IOSError, setIOSError] = useState(false);
  const [ noEmail, setNoEmail  ] = useState(false);
  const handleLogin = () => {
    setUsernameError(false);
    setPasswordError(false);
    setInvalidEmail(false);
    setErrorMessage("");
    setIOSError(false);
    setSnackbarMessage('');
    if (!username) {
      if (Platform.OS === 'ios') {
        setIOSError(true);
        setErrorMessage("Please enter email-ID");
      } else {
        setUsernameError(true);
        setErrorMessage("provide E-mail");
      }
    }
    else if (!validateEmail(username)) {
      if (Platform.OS === 'ios') {
        setIOSError(true);
        setErrorMessage("Please enter a valid email");
      } else {
        setInvalidEmail(true);
        setErrorMessage("Invalid email");
      }
    }
    else if (emailExist) {
      checkEmailExist();
    }
    else if (!password) {
      if (Platform.OS === 'ios') {
        navigation.navigate('PasswordError')
      } else {
        setPasswordError(true);
        setErrorMessage("provide password");
      }

    }
    else {
      Login();
    }
  };

  const handleAuth = () => {
    setShowFingerAuth((prevShowFingerAuth) => !prevShowFingerAuth);
  }
  const Login = async () => {
    setShowLoader(true);
    let data = qs.stringify({
      'grant_type': 'password',
      'username': username,
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
      await saveLoginDetails();
      setShowLoader(false);
      navigation.navigate("Dashboard");
      setUsername('');
      setPassword('');
    } catch (error) {
      setShowLoader(false);
      if(Platform.OS === 'android'){
        handleShowSnackbar("Invalid username or password");
      }else{
        navigation.navigate('PasswordError')
      }
      console.log(error);
    }
  }

  const saveLoginDetails = async () => {
    try {
      // Construct an object containing login details
      const loginDetails = {
        email: username,
        password: password
      };

      const jsonLoginDetails = JSON.stringify(loginDetails);

      await AsyncStorage.setItem('loginDetails', jsonLoginDetails);

    } catch (error) {
      console.error('Error saving login details:', error);
    }
  };

  const getSwitch5Status = async () => {
    try {
      const data = await AsyncStorage.getItem('Configurations');

      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData) {
          for (const key in parsedData) {
            if (parsedData.hasOwnProperty(key) && parsedData[key].switch5 === true) {
              return true;
            }
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Error getting Configurations from AsyncStorage:', error);
      return false;
    }
  };

  useEffect(() => {
    getFunction = async () => {
      const status = await getSwitch5Status();
      if (status) {
        setShowAuth(true);
      }
    }

    getFunction()
  }, [])

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

  const checkEmailExist = () => {
    checkEmail();
  };

  const checkEmail = async () => {
    try {
      setShowLoader(true);
      console.log('Checking email for:', username);
      const response = await axios.get(`https://api-patient-dev.easy-health.app/patient/${username}`);
      console.log('Response data:', response.data);

      if (response.data.registered === true) {
        setEmailExist(false);
        setButtonText('Login');
        setShowPasswordInput(true);
      } else {
          handleShowSnackbar('Incorrect Username/E-mail');
      }
      setShowLoader(false);
    } catch (error) {
      console.error('Error:', error);
      setShowLoader(false);
    }
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
    <>
      <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
        <ValidationMessageError visible={IOSError} msg={errorMessage} setVisible={setIOSError} />
        {showLoader && <ModalLoader />}
        {showFingerAuth && <FingerPrint setShowFingerAuth={setShowFingerAuth} />}
        <View style={styles.container}>
          <Image source={config.logo} style={styles.logo}></Image>
          <Image source={config.subLogo} style={styles.subLogo}></Image>
          <Text style={styles.login}>Login</Text>
          <View style={styles.FormContainer}>
            <View style={[styles.inputContainer, isEmailFocused && styles.focusedInput]}>
              <TextInput
                style={styles.inputEmail}
                placeholder="E-mail"
                value={username}
                onChangeText={(text) => setUsername(text.trim())}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                placeholderTextColor={config.primaryColor}
                color="black"
                autoCapitalize="none"
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
          {showPasswordInput &&
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
                    placeholderTextColor={config.primaryColor}
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
          }

          {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
          <TouchableOpacity style={{ width: '100%', marginTop: 50 }}>
            <CustomButton onPress={() => handleLogin()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Next"} />
          </TouchableOpacity>
          {
            showAuth &&
            <View style={{ width: '100%', marginTop: 15 }}>
              <CustomButton onPress={() => handleAuth()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Authenticate Connect"} title={"authorization"} />
            </View>
          }

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

        {/* {
        IOSError && 
         */}
        {/* } */}
 
        
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
        justifyContent: 'center',
        // gap: 5,
      },
      android: {
        paddingTop: 20,
        marginTop: '20%',
        justifyContent: 'top',
      },
    })
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

export default LoginScreen;
