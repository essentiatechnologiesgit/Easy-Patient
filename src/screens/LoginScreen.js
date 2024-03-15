import React, { useState } from 'react';
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
      console.log(JSON.stringify(response.data));
      await AsyncStorage.setItem('loginResponse', JSON.stringify(response.data));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }



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

        <TextInput
          style={styles.inputEmail}
          placeholder="E-mail"
          value={username}
          onChangeText={setUsername}
        />
        {/* <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <Path d="M22 6.27V18H2V6.27l9.99 7.36L22 6.27zM12 13.36L3.09 7.12H20.91L12 13.36z" fill="none" stroke={config.primaryColor} strokeWidth="1" />
        </Svg> */}

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
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <View style={{ width: '100%', right: 30, bottom: 10 }}>
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
  inputEmail: {
    marginTop: '10%',
    height: 40,
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    width: '90%',
    fontSize: PixelRatio.getFontScale() * 18,
    borderBottomColor: config.secondaryColor,
  },
  inputPassword: {
    marginTop: 10,
    height: 40,
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    width: '90%',
    fontSize: PixelRatio.getFontScale() * 18,
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
    marginTop: 10,
  },
  login: {
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() * 22,
    marginTop: 10,
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
