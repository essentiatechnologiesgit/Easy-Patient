import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
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
  const emailInputRef = useRef(null);
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
    else if (emailExist) {
      checkEmailExist();
    }
    else if (!password) {

      setPasswordError(true);
      setErrorMessage("provide password");
    }
    else {
      Login();
    }
  };

  const Login = async () => {
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
      navigation.navigate("Dashboard");
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
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

  const checkEmailExist = () => {
    checkEmail();
  };

  const checkEmail = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(`https://api-patient-dev.easy-health.app/patient/${username}`);
      if (response.data.registered === true) {
        setEmailExist(false);
        setButtonText("Login");
        setShowPasswordInput(true);
      } else {
        handleShowSnackbar("Incorrect Username/E-mail");
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
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
      {showLoader && <ModalLoader />}
      <View style={styles.container}>
        <Image source={config.logo} style={styles.logo}></Image>
        <Image source={config.subLogo} style={styles.subLogo}></Image>
        <Text style={styles.login}>Login</Text>
        <View style={styles.FormContainer}>
          <View style={[styles.inputContainer, isEmailFocused && styles.focusedInput]}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" style={styles.icon}>
              <Path d="M22 6.27V18H2V6.27l9.99 7.36L22 6.27zM12 13.36L3.09 7.12H20.91L12 13.36z" fill="none" stroke="black" strokeWidth="1" />
            </Svg>
            <TextInput
              style={styles.inputEmail}
              placeholder="E-mail"
              value={username}
              onChangeText={setUsername}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              // caretHidden={true} // Set to true if you want to hide the cursor
              caretColor="red" // Set the color of the cursor
            />
          </View>
        </View>


        <View style={{ width: '100%', right: 30, bottom: 10 }}>
          {usernameError && !username && (
            <>
              <AlertIcon />
              <ValidationError errorMessage={errorMessage} />
            </>
          )}
        </View>
        <View style={{ width: '100%', right: 30, bottom: 10 }}>
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
                <Svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">
                  <Path d="M 34 0 C 25.179688 0 18 7.175781 18 16 C 18 17.960938 18.382813 19.824219 19.03125 21.5625 L 0.28125 40.28125 L 0 40.59375 L 0 47.40625 L 0.28125 47.71875 L 2.28125 49.71875 L 2.59375 50 L 9.40625 50 L 9.71875 49.71875 L 12.71875 46.71875 L 13 46.40625 L 13 44 L 15.40625 44 L 15.71875 43.71875 L 18.71875 40.71875 L 19 40.40625 L 19 39 L 20.40625 39 L 20.71875 38.71875 L 22.71875 36.71875 L 23 36.40625 L 23 35 L 24.40625 35 L 24.71875 34.71875 L 28.4375 30.96875 C 30.175781 31.617188 32.039063 32 34 32 C 42.820313 32 50 24.820313 50 16 C 50 7.175781 42.820313 0 34 0 Z M 34 2 C 41.738281 2 48 8.257813 48 16 C 48 23.738281 41.738281 30 34 30 C 32.078125 30 30.257813 29.636719 28.59375 28.9375 C 28.582031 28.925781 28.574219 28.917969 28.5625 28.90625 C 23.535156 26.78125 20 21.804688 20 16 C 20 8.257813 26.261719 2 34 2 Z M 34 5 C 31.183594 5 28.363281 6.074219 26.21875 8.21875 L 25.5 8.9375 L 26.21875 9.625 L 40.375 23.78125 L 41.0625 24.5 L 41.78125 23.78125 C 46.070313 19.496094 46.070313 12.503906 41.78125 8.21875 C 39.636719 6.074219 36.816406 5 34 5 Z M 34 7 C 36.300781 7 38.613281 7.863281 40.375 9.625 C 43.648438 12.898438 43.75 17.996094 40.9375 21.53125 L 28.46875 9.0625 C 30.101563 7.765625 32.023438 7 34 7 Z M 19.875 23.53125 C 21.371094 26.328125 23.671875 28.628906 26.46875 30.125 L 23.5625 33 L 21 33 L 21 35.5625 L 19.5625 37 L 17 37 L 17 39.5625 L 14.5625 42 L 11 42 L 11 45.5625 L 8.5625 48 L 3.4375 48 L 2.4375 47 L 19 30.4375 C 19.359375 30.128906 19.457031 29.613281 19.230469 29.199219 C 19.003906 28.78125 18.515625 28.582031 18.0625 28.71875 C 17.871094 28.761719 17.699219 28.859375 17.5625 29 L 2 44.59375 L 2 41.4375 Z"></Path>
                </Svg>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
              </View>
            </View>
          </>
        }

        {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
        <TouchableOpacity
          style={
            styles.loginButton
          }
          onPress={handleLogin}
        >
          <Text style={{ color: config.tertiaryColor, textAlign: 'center', fontSize: PixelRatio.getFontScale() * 18 }}>{ButtonText}</Text>
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
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: PixelRatio.getFontScale() * 18,
    borderBottomColor: config.secondaryColor,
    borderBottomWidth: 2,
    width: '90%',
  },
  icon: {
    marginRight: 2,
  },
  inputEmail: {
    flex: 1,
    fontSize: PixelRatio.getFontScale() * 18,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    padding: 10,
    fontSize: PixelRatio.getFontScale() * 18,
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
    borderColor: '#fff',
    resizeMode: 'contain',
    zIndex: 999,
  },
  subLogo: {
    marginTop: 10,
  },
  login: {
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() * 22,
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
    fontSize: PixelRatio.getFontScale() * 18,
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
    fontSize: PixelRatio.getFontScale() * 18
  },
  register: {
    paddingTop: '15%',
    textDecorationLine: 'underline',
    color: config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 18
  }
});

export default LoginScreen;
