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
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPassFocused, setIsConfirmPassFocused] = useState(false);
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
  const [password, setPassword] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState(null)
  const [passwordInput, setPasswordInput] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [matchError, setMatchError] = useState(false);
  const [validePassword, setValidPassword] = useState(false);
  const [pLengthError, setPLengthError] = useState(false);
  const [cpLengthError, setCPLengthError] = useState(false);

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    // console.warn(otpValue);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleConfirmPassFocus = () => {
    setIsConfirmPassFocused(true);
  };

  const handleConfirmPassBlur = () => {
    setIsConfirmPassFocused(false);
  };

  const handleConfirm = () => {
    setUsernameError(false);
    setMatchError(false);
    setCPLengthError(false);
    setPLengthError(false);
    setConfirmPasswordError(false);
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
      }
      else if (password.length < 5) {
        setPLengthError(true);
        setErrorMessage("Please provide 5 digits password");
      }
      else if (!ConfirmPass) {
        setConfirmPasswordError(true);
        setErrorMessage("Incorrect Confirm Password");
      }
      else if (ConfirmPass.length < 5) {
        setCPLengthError(true);
        setErrorMessage("Please provide 5 digits password");
      }
      else {
        if (password != ConfirmPass) {
          setMatchError(true);
          setErrorMessage("Passwords does not match");
        }
        else {
          changePassword();
        }
      }
    }
  }
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };
  const changePassword = () => {
    setShowLoader(true);
    let data = qs.stringify({
      'username': username,
      'change_key': otp,
      'new_password': password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-patient-dev.easy-health.app/o/reset-password',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getDetails();
        // setShowLoader(false);
        // navigation.navigate("Dashboard");
      })
      .catch((error) => {
        setShowLoader(false);
        handleShowSnackbar('Error! try again');
        navigation.goBack();
        console.log(error);
      });
  }
  const getDetails = async () => {
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

    } catch (error) {
      setShowLoader(false);
      handleShowSnackbar("Invalid username or password");
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
        } else {
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
        {!showPassword &&
          <Text style={styles.signup}>Forgot Password</Text>
        }
        {!OTPbox && !showPassword &&
          <>
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
              />
            </View>
            <View style={{ width: '100%', right: 30, bottom: 0 }}>
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
            <View style={{ marginTop: 55 }}></View>
            <TextInput
              style={[
                styles.inputConfirmPass,
                isPasswordFocused && styles.focusedInput,
              ]}
              placeholder="Password"
              onChangeText={(text) => setPassword(text.trim())}
              secureTextEntry={true}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              placeholderTextColor={config.primaryColor}
              color="black"
            />
            <View style={{ width: '100%', right: 30, bottom: 10 }}>
              {passwordError && !password && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
              {pLengthError && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
            </View>
            <TextInput
              style={[
                styles.inputConfirmPass,
                isConfirmPassFocused && styles.focusedInput,
              ]}
              placeholder="Confirm Password"
              onChangeText={setConfirmPass}
              secureTextEntry={true}
              onFocus={handleConfirmPassFocus}
              onBlur={handleConfirmPassBlur}
              placeholderTextColor={config.primaryColor}
              color="black"
            />
            <View style={{ width: '100%', right: 30, bottom: 15 }}>
              {confirmPasswordError && !ConfirmPass && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
            </View>
            <View style={{ width: '100%', right: 30, bottom: 15 }}>
              {matchError && (
                <>
                  <AlertIcon />
                  <ValidationError errorMessage={errorMessage} />
                </>
              )}
              {cpLengthError && (
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
          <CustomizedButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={config.buttonText} text={"Confirm"} />
        </View>
        {!OTPbox && !showPassword &&
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
              <TouchableOpacity onPress={sendOTP}>
                <Text style={[styles.codeText, { textDecorationLine: 'underline', color: config.secondaryColor }]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
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
  inputContainer: {
    marginTop: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: PixelRatio.getFontScale() * 17,
    borderBottomColor: config.secondaryColor,
    borderBottomWidth: 2,
    width: '90%',
  },
  inputEmail: {
    flex: 1,
    marginBottom: -8,
    paddingLeft: 8,
    height: 40,
    fontSize: PixelRatio.getFontScale() * 17,
    color: 'red',
  },
  focusedInput: {
    borderBottomWidth: 4, // Increased border bottom width when focused
  },
  icon: {
    marginBottom: -7,
    marginRight: 2,
  },
  focusedInput: {
    borderBottomWidth: 3,
  },
  inputConfirmPass: {
    // marginTop: '1%',
    height: 40,
    borderWidth: 0,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 2,
    width: '90%',
    fontSize: PixelRatio.getFontScale() * 17,
    borderBottomColor: config.secondaryColor,
  },
  TextContainer: {
    width: '80%',
    marginTop: 40,
  },
  TextContainerText: {
    fontSize: PixelRatio.getFontScale() * 17,
    textAlign: 'center',
    color: config.primaryColor,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  },
  OTPContainer: {
    marginTop: 40,
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
  codeText: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
    color: config.primaryColor
  },

  signup: {
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() * 18,
    marginTop: 30,
    color: config.textColorHeadings,
  },
  login: {
    paddingTop: '15%',
    textDecorationLine: 'underline',
    color: config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 15
  },
});

export default ForgotPassword;
