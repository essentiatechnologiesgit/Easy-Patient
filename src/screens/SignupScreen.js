import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import Svg, { Path } from 'react-native-svg';
import AlertIcon from '../components/AlertIcon';
import OtpInput from '../components/OTPInput';
const SignupScreen = () => {
  const navigation = useNavigation();
  const [placeholderLabelAnim] = useState(new Animated.Value(selectedGender ? 1 : 0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
 
  //input feilds 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [date, setDate] = useState("");
  const [selectedGender, setSelectedGender] = useState('');
  //validation feilds
  const [emailError, setEmailError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const handleRegister = () => {
    setShowForm(true);
    // setVerifyOTP(true);
  };
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    // console.warn(otpValue);
  };

  let formattedDate = '';
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    formattedDate = `${day}/${month}/${year}`;
  }

  const handleOTPSend = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api-patient-dev.easy-health.app/o/forgot-password/${email}`,
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
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handleLogin = () => {
    navigation.goBack();
  }

  const genders = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];

  const handleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedGender(item.value);
    setIsOpen(false);
    setPlaceholderVisible(false);
    Animated.timing(placeholderLabelAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

  };

  const handlePressDatePicker = () => {
    setShowDatePicker(true);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Form Submit Function 
  const handleConfirm = () => {
    setEmailError(false);
    setFullNameError(false);
    setDateError(false);
    setGenderError(false);
    setConfirmPasswordError(false);
    setPasswordError(false);
    setPasswordMatch(false);
    setErrorMessage("");
    setInvalidEmail(false);
    if (!email) {
      setEmailError(true);
      setErrorMessage("Please provide email");
    }
    else if (!validateEmail(email)) {
      setInvalidEmail(true);
      setErrorMessage("Invalid email");
    }
    else if (!fullName) {
      setFullNameError(true);
      setErrorMessage("Please provide Full Name");
    }
    else if (!date) {
      setDateError(true);
      setErrorMessage("Please select date of Birth");
    }
    else if (!selectedGender) {
      setGenderError(true);
      setErrorMessage("Please select gender");
    }
    else if (!password) {
      setPasswordError(true);
      setErrorMessage("Please provide password");
    }
    else if (!confirmPassword) {
      setConfirmPasswordError(true);
      setErrorMessage("Please provide Confirm Password");
    }
    else if (confirmPassword != password) {
      setPasswordMatch(true);
      setErrorMessage("Passwords dosent match");
    }
    else {
      checkEmailRegistration();
    }
  };

  const checkEmailRegistration = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(`https://api-patient-dev.easy-health.app/patient/${email}`);
      if (response.data.registered === true) {
        setShowLoader(false);
        handleShowSnackbar("The informed email is already in use. Please try using another one.");
      } else {
        RegisterAccount();
      }

    } catch (error) {
      console.error('Error:', error);
      setShowLoader(false);
    }
  }

  const handleVerifyOTP = () => {
    if (!otp) {
      handleShowSnackbar("Invalid OTP");
    } else {
      let data = qs.stringify({
        'email': email,
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
            // navigate to Dashboard
          } else {
            handleShowSnackbar("Invalid OTP");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const RegisterAccount = () => {

    let data = qs.stringify({
      'email': email,
      'fullname': fullName,
      'date_of_birth': formattedDate,
      'gender': selectedGender,
      'password': password
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api-patient-dev.easy-health.app/patient/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZWZmZWN0aXZlc2FsZXNfd2ViX2NsaWVudDo4dz9keF5wVUVxYiZtSnk/IWpBZiNDJWtOOSFSMkJaVQ=='
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if (response.data.created) {
          setShowLoader(false);
          setVerifyOTP(true);
          setShowForm(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
      {/* <View style={styles.container}></View> */}
      <View style={styles.container}>
        <Image source={config.logo} style={styles.logo}></Image>
        <Image source={config.subLogo} style={styles.subLogo}></Image>
        <Text style={styles.signup}>Signup</Text>
        {!showForm && !verifyOTP && <View style={styles.signupContainer} >
        <View style={[styles.inputContainer, isEmailFocused && styles.focusedInput]}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" style={styles.icon}>
              <Path d="M22 6.27V18H2V6.27l9.99 7.36L22 6.27zM12 13.36L3.09 7.12H20.91L12 13.36z" fill="none" stroke="black" strokeWidth="1" />
            </Svg>
            <TextInput
              style={styles.inputEmail}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              value={termsAccepted}
              onValueChange={() => { setTermsAccepted(!termsAccepted) }}
              tintColors={{ true: config.secondaryColor }}
            />
            <Text style={styles.text}>I accept the </Text><Text style={[{ textDecorationLine: 'underline' }, styles.text]}>Terms & Conditions</Text>
          </View>
          <TouchableOpacity
            style={[termsAccepted ? { backgroundColor: config.secondaryColor } : { backgroundColor: 'rgba(0,0,0,0)' },
            styles.loginButton]
            }
            onPress={handleRegister}
            disabled={!termsAccepted}
          >
            <Text style={[termsAccepted ? { color: config.tertiaryColor } : { color: config.secondaryColor }, { textAlign: 'center', fontSize: PixelRatio.getFontScale() * 18 }]} >Next</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>

            <Text style={styles.login}>I already have an account</Text>
          </TouchableOpacity>
        </View>
        }
        {
          showForm &&
          <>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
              <View style={styles.signupFormContainer}>
                <View style={styles.floatingLabel}>
                  <FloatingLabelInput
                    label={'E-mail'}
                    inputStyles={styles.inputStyles}
                    labelStyles={{ paddingHorizontal: 0 }}
                    customLabelStyles={styles.customLabelStyles}
                    value={email}
                    onChangeText={value => setEmail(value)}
                    containerStyles={styles.containerStyles}
                  />
                  {emailError && !email && (
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

                <View style={styles.floatingLabel}>
                  <FloatingLabelInput
                    label={'Full Name'}
                    inputStyles={styles.inputStyles}
                    customLabelStyles={styles.customLabelStyles}
                    value={fullName}
                    onChangeText={value => setFullName(value)}
                    containerStyles={styles.containerStyles}

                  />
                  {fullNameError && !fullName && (
                    <>
                      <AlertIcon />
                      <ValidationError errorMessage={errorMessage} />
                    </>
                  )}
                </View>
                <View style={styles.floatingLabel}>
                  <TouchableOpacity onPress={handlePressDatePicker}>
                    <View style={{ ...styles.containerStyles }}>
                      {date ? (
                        <Text style={{ marginBottom: 10 }}>Date Of Birth</Text>
                      ) : (
                        <TextInput
                          style={{ ...styles.inputStyles, marginTop: -16, marginBottom: 10, left: 5 }}
                          placeholder="Date Of Birth"
                          placeholderTextColor={config.primaryColor}
                          editable={false}
                          value={date ? formattedDate : ""}

                        />
                      )}
                      {date && (
                        <Text style={{ ...styles.inputStyles, marginTop: -32 }}>{formattedDate}</Text>
                      )}
                      {dateError && !date && (
                        <>
                          <AlertIcon />
                          <ValidationError errorMessage={errorMessage} />
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    textColor="red"
                  />
                )}
                <View style={{ ...styles.floatingLabel, borderBottomWidth: 0.96, borderBottomColor: config.secondaryColor, zIndex: 999, marginTop: 5 }}>
                  <Animated.Text
                    style={[
                      styles.placeholderLabel,
                      {
                        transform: [
                          {
                            translateY: placeholderLabelAnim.interpolate({
                              inputRange: [0, 1.5],
                              outputRange: [0, -25],
                            }),
                          },
                          {
                            scale: placeholderLabelAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.95, 0.9],
                            }),
                          },
                        ],
                        // Apply margin left conditionally
                        marginLeft: placeholderLabelAnim.interpolate({
                          inputRange: [0, 1.5],
                          outputRange: [0, -5], // Move the text to the left after animation
                        }),
                        // Interpolate font size
                        fontSize: placeholderLabelAnim.interpolate({
                          inputRange: [0, 1.5],
                          outputRange: [PixelRatio.getFontScale() * 18, PixelRatio.getFontScale() * 16], // Change font size after animation
                        }),
                      },
                    ]}
                  >
                    Select Gender
                  </Animated.Text>

                  <DropDownPicker
                    items={genders}
                    value={selectedGender}
                    onSelectItem={handleSelect}
                    placeholder=""
                    open={isOpen}
                    showArrowIcon={false}
                    onOpen={handleOpen}
                    onClose={handleOpen}
                    listMode="SCROLLVIEW"
                    style={{
                      backgroundColor: styles.primaryColor,
                      borderWidth: 0,
                      left: -7,
                      top: 8,
                      color: config.primaryColor,
                    }}
                    textStyle={{
                      fontSize: PixelRatio.getFontScale() * 18,
                    }}
                  />
                  {genderError && !selectedGender && (
                    <>
                      <AlertIcon />
                      <ValidationError errorMessage={errorMessage} />
                    </>
                  )}
                </View>
                <View style={styles.floatingLabel}>
                  <FloatingLabelInput
                    label={'Password'}
                    inputStyles={styles.inputStyles}
                    labelStyles={{ paddingHorizontal: 0 }}
                    customLabelStyles={styles.customLabelStyles}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    containerStyles={styles.containerStyles}
                    isPassword={true}
                    customHidePasswordComponent={<View></View>}
                    customShowPasswordComponent={<View></View>}
                  />

                  {passwordError && !password && (
                    <>
                      <AlertIcon />
                      <ValidationError errorMessage={errorMessage} />
                    </>
                  )}
                </View>
                <View style={styles.floatingLabel}>
                  <FloatingLabelInput
                    label={'Confirm Password'}
                    inputStyles={styles.inputStyles}
                    customLabelStyles={styles.customLabelStyles}
                    value={confirmPassword}
                    onChangeText={value => setConfirmPassword(value)}
                    containerStyles={styles.containerStyles}
                    isPassword={true}
                    customHidePasswordComponent={<View></View>}
                    customShowPasswordComponent={<View></View>}
                  />
                  {confirmPasswordError && !confirmPassword && (
                    <>
                      <AlertIcon />
                      <ValidationError errorMessage={errorMessage} />
                    </>
                  )}
                  {PasswordMatch && (
                    <>
                      <AlertIcon />
                      <ValidationError errorMessage={errorMessage} />
                    </>
                  )}
                </View>
                <View style={{ width: '100%', marginTop: 40 }}>
                  <CustomizedButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                </View>
                <TouchableOpacity onPress={handleLogin}><Text style={styles.backLink}>I already have an account</Text></TouchableOpacity>
              </View>
            </ScrollView>

          </>
        }
        {
          verifyOTP &&
          <>
            <View style={styles.TextContainer}>
              <Text style={styles.TextContainerText}>You will receive a code at the registered email. Enter the code below.</Text>
            </View>
            <View style={styles.OTPContainer}>
              <OtpInput onChange={handleOtpChange} />
            </View>
            <View style={{ width: '100%', marginTop: 40 }}>
              <CustomizedButton onPress={handleVerifyOTP} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
            </View>
            <View style={{ marginTop: '8%' }}><Text style={styles.codeText}>Didn't receive the code?</Text><Text style={styles.codeText}>Click here:</Text></View>
            <View style={{ marginTop: '7%' }}>
              <TouchableOpacity onPress={handleOTPSend}>
                <Text style={[styles.codeText, { textDecorationLine: 'underline', color: config.secondaryColor }]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }

        {showLoader && <ModalLoader />}

      </View>


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
  inputContainer: {
    marginTop:'4%',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: PixelRatio.getFontScale() * 18,
    borderBottomColor: config.secondaryColor,
    borderBottomWidth: 2,
    width: '90%',
  },
  placeholderLabel: {
    position: 'absolute',
    left: 0,
    top: 14,
    fontSize: PixelRatio.getFontScale() * 18,
    color: config.primaryColor,
    zIndex: 1,
    lineHeight: PixelRatio.getFontScale() * 20,
  },
  TextContainer: {
    width: '80%',
    marginTop: 40,
  },
  TextContainerText: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
  },
  inputEmail: {
    flex: 1,
    fontSize: PixelRatio.getFontScale() * 18,
  },
  icon: {
    marginRight: 2,
  },
  focusedInput: {
    borderBottomWidth:3,
  },
  OTPContainer: {
    marginTop: 50,
  },
  codeText: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: PixelRatio.getFontScale() * 18,
    color: config.primaryColor,
    zIndex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    lineHeight: PixelRatio.getFontScale() * 20,
  },
  labelFloating: {
    top: -PixelRatio.getFontScale() * 4,
    fontSize: PixelRatio.getFontScale() * 18,
  },
  dropdownPicker: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: config.secondaryColor,
  },
  dropdownTextStyle: {
    color: config.primaryColor,
    fontSize: PixelRatio.getFontScale() * 18,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  signupContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  signupFormContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',

  },

  FocusStyling: {
    color: config.primaryColor,
  },

  backLink: {
    fontSize: PixelRatio.getFontScale() * 18,
    color: config.secondaryColor,
    textDecorationLine: 'underline',
    marginTop: 50,
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

  signup: {
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
    borderWidth: 1,
    color: config.secondaryColor,
    borderColor: config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 18,
    // backgroundColor: 'rgba(0,0,0,0)', // Set background color directly
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    textDecorationLine: 'underline',
    width: '90%',
    textAlign: 'right',
    marginTop: 20,
    fontSize: PixelRatio.getFontScale() * 18
  },
  login: {
    paddingTop: '15%',
    textDecorationLine: 'underline',
    color: config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 18
  },
  checkbox: {
    marginTop:'4%',
    width: '90%',
    justifyContent: 'left',
    textAlign: 'left',
    flexDirection: 'row'
  },
  text: {
    fontSize: PixelRatio.getFontScale() * 18,
    padding: 2,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 16,
    color: config.primaryColor,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: config.primaryColor,
    borderRadius: 5,
    fontSize: 16,
  },
  floatingLabel: {
    marginBottom: 10,
    width: '90%',
    height: '100%',
    flex: 1
  },
  containerStyles: {
    fontSize: PixelRatio.getFontScale() * 18,
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
    fontSizeBlurred: PixelRatio.getFontScale() * 18,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0
  },
  inputStyles: {
    fontSize: PixelRatio.getFontScale() * 18,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 30,
    color: config.textColorHeadings
  }
});

export default SignupScreen;
