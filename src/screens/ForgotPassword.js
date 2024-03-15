import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import CustomizedButton from '../components/CustomizedButton';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import AlertIcon from '../components/AlertIcon';
import ValidationError from '../components/ValidationError';
import OtpInput from '../components/OTPInput';
import Snackbar from '../components/Snackbar';
import qs from 'qs';
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showLoader, setShowLoader] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarKey, setSnackbarKey] = useState(0);
  const [usernameError, setUsernameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailExist, setEmailExist] = useState(true);
  const [OTPbox, setOTPbox] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [otp, setOtp] = useState('');
  const [InvalidOTP, setInvalidOTP] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null)
  const [ConfirmPass, setConfirmPass] = useState(null)
  const [passwordInput, setPasswordInput] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    // console.warn(otpValue);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleConfirm = () => {
    setUsernameError(false);
    setErrorMessage('');
    if (!username) {
      setUsernameError(true);
      setErrorMessage("Incorrect Username/E-mail");
    } else if (!validateEmail(username)) {
      setInvalidEmail(true);
      setErrorMessage("Invalid email");
    }
    else if (emailExist) {
      checkEmailExist();
    } else if (!otp) {
      handleShowSnackbar("Invalid OTP");
    } else if (InvalidOTP) {
      VerifyOTP()
    } else if (passwordInput) {
      if (!password) {
        setPasswordError(true);
        setErrorMessage("Incorrect Password");
      } else if (!ConfirmPass) {
        setConfirmPasswordError(true);
        setErrorMessage("Incorrect Confirm Password");
      } else {
        console.log("changePassword called");
        changePassword();
      }
    }
  }

  const changePassword = () => {

    let data = qs.stringify({
      'username': 'carlos.eduardo@essentia.com.br',
      'change_key': '7413',
      'new_password': 'abc123' 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-patient-dev.easy-health.app/o/reset-password',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  const VerifyOTP = () => {
    let data = qs.stringify({
      'email': username,
      'code': otp
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-patient-dev.easy-health.app/patient/verify-otp',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.valid === true) {
          setShowPassword(true);
          setOTPbox(false);
          setInvalidOTP(false);
        }else{
          handleShowSnackbar("Invalid OTP");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const checkEmailExist = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(`https://api-patient-dev.easy-health.app/patient/${username}`);
      if (response.data.registered === true) {
        setOTPbox(true);
        setEmailExist(false);
        sendOTP();

      } else {
        handleShowSnackbar("Incorrect Username/E-mail");
      }
      setShowLoader(false);
    } catch (error) {
      console.error('Error:', error);
      setShowLoader(false);
    }
  }

  const sendOTP = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api-patient-dev.easy-health.app/o/forgot-password/${username}`,
      headers: {
        'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleShowSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarKey((prevKey) => prevKey + 1);
  };

  const handleRegister = () => {
    navigation.navigate('Signup')
  }

  const handleLogin = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
      {showLoader && <ModalLoader />}
      <View style={styles.container}>
        <Image source={config.logo} style={styles.logo}></Image>
        <Image source={config.subLogo} style={styles.subLogo}></Image>
        <Text style={styles.signup}>Forgot Password</Text>
        {!OTPbox && !showPassword &&
          <>
            <TextInput
              style={styles.inputEmail}
              placeholder="E-mail"
              value={username}
              onChangeText={setUsername}
            />
            <View style={{ width: '100%', right: 30, bottom: 10 }}>
              {usernameError && !username && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
              {invalidEmail && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
            </View>
          </>
        }
        {showPassword &&
          <>
            <TextInput
              style={styles.inputEmail}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <View style={{ width: '100%', right: 30, bottom: 10 }}>

              {passwordError && !password && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
            </View>
            <TextInput
              style={styles.inputConfirmPass}
              placeholder="Confirm Password"
              value={ConfirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry={true}
            />
            <View style={{ width: '100%', right: 30, bottom: 10 }}>
              {confirmPasswordError && !ConfirmPass && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
            </View>
          </>
        }


        {OTPbox &&
          <>
            <View style={styles.TextContainer}>
              <Text style={styles.TextContainerText}>You will receive a code at the registered email. Enter the code below.</Text>
            </View>
            <View style={styles.OTPContainer}>
              <OtpInput onChange={handleOtpChange} />
            </View>
          </>
        }


        <View style={{ width: '100%', marginTop: 40 }}>
          <CustomizedButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
        </View>
        {!OTPbox &&
          <>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.login}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.login}>I already have an account</Text>
            </TouchableOpacity>
          </>
        }
        {OTPbox &&
          <>
            <View style={{ marginTop: '8%' }}><Text style={styles.codeText}>Didn't receive the code?</Text><Text style={styles.codeText}>Click here:</Text></View>
            <View style={{ marginTop: '7%' }}>
              <Text style={[styles.codeText, { textDecorationLine: 'underline', color: config.secondaryColor }]}>
                Resend Code
              </Text>
            </View>
          </>
        }
        {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  inputConfirmPass: {
    marginTop: '1%',
    height: 40,
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    width: '90%',
    fontSize: PixelRatio.getFontScale() * 18,
    borderBottomColor: config.secondaryColor,
  },
  TextContainer: {
    width: '80%',
    marginTop: 40,
  },
  TextContainerText: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  },
  OTPContainer: {
    marginTop: 50,
  },
  logo: {
    borderColor: '#fff',
    resizeMode: 'contain',
    zIndex: 999,
  },
  codeText: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
  },
  subLogo: {
    marginTop: 10,
  },
  signup: {
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() * 22,
    marginTop: 30,
    color: config.textColorHeadings,
  },
  login: {
    paddingTop: '15%',
    textDecorationLine: 'underline',
    color: config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 18
  },
});

export default ForgotPassword;
