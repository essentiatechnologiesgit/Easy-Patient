import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [placeholderLabelAnim] = useState(new Animated.Value(selectedGender ? 1 : 0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  // const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = () => {
    // Replace with your actual validation and login logic (e.g., API call)
    setShowForm(true)
  };

  const handleLogin = () => {
    navigation.goBack();
  }

  const [selectedGender, setSelectedGender] = useState('');

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
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




  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
      {/* <View style={styles.container}></View> */}
      <View style={styles.container}>
        <Image source={config.logo} style={styles.logo}></Image>
        <Image source={config.subLogo} style={styles.subLogo}></Image>
        <Text style={styles.signup}>Signup</Text>
        {!showForm && <View style={styles.signupContainer} >
          <TextInput
            style={styles.inputEmail}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
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
                </View>
                <View style={styles.floatingLabel}>
                  <TouchableOpacity onPress={handlePressDatePicker}>
                    <View style={{ ...styles.containerStyles }}>
                      {date ? (
                        <Text>Date Of Birth</Text>
                      ) : (
                        <TextInput
                          style={{ ...styles.inputStyles, marginTop: -15, marginBottom: 10 }}
                          placeholder="Date Of Birth"
                          editable={false}
                          value={date ? date.toDateString() : ""} // Ensure `date` is not null before using `toDateString()`
                        />
                      )}
                      {date && (
                        <Text style={{ marginBottom: 10, color: 'black' }}>{date.toDateString()}</Text>
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
                <View style={{ ...styles.floatingLabel, borderBottomWidth: 1, borderBottomColor: config.secondaryColor, zIndex: 999, marginTop: 5 }}>
                  <Animated.Text
                    style={[
                      styles.placeholderLabel,
                      {
                        transform: [
                          {
                            translateY: placeholderLabelAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -25],
                            }),
                          },
                          {
                            scale: placeholderLabelAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0.9],
                            }),
                          },
                        ],
                      },
                    ]}>
                    Select Gender
                  </Animated.Text>
                  <DropDownPicker
                    items={genders}
                    value={selectedGender}
                    onSelectItem={handleSelect}
                    placeholder=""
                    open={isOpen}
                    onOpen={handleOpen}
                    onClose={handleOpen}
                    listMode="SCROLLVIEW"
                    style={{
                      backgroundColor: styles.primaryColor,
                      borderWidth: 0,
                      left: -7,
                      width: "103%"
                    }}
                    textStyle={{
                      fontSize: PixelRatio.getFontScale() * 18,
                    }}
                  />
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
                </View>
                <View style={styles.floatingLabel}>
                  <FloatingLabelInput
                    label={'Confirm Password'}
                    inputStyles={styles.inputStyles}
                    customLabelStyles={styles.customLabelStyles}
                    value={confirmPassword}
                    onChangeText={value => setConfirmPassword(value)}
                    containerStyles={styles.containerStyles}
                  // isPassword={true}

                  />
                </View>
                <View style={{ width: '100%', marginTop: 40 }}>
                  <CustomizedButton buttonColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                </View>
                <TouchableOpacity onPress={handleLogin}><Text style={styles.backLink}>I already have an account</Text></TouchableOpacity>
              </View>
            </ScrollView>


          </>
        }
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
  placeholderLabel: {
    position: 'absolute',
    left: -2,
    top: 16, // Adjust this value as needed
    fontSize: PixelRatio.getFontScale() * 18,
    color: 'grey',
    zIndex: 1,
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 16,
    color: '#888',
    zIndex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    lineHeight: PixelRatio.getFontScale() * 20,
  },
  labelFloating: {
    top: -PixelRatio.getFontScale() * 4,
    fontSize: 12,
  },
  dropdownPicker: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: config.secondaryColor,
  },
  dropdownTextStyle: {
    color: 'grey',
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
    width: '90%',
    justifyContent: 'center',
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
    color: 'gray',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
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
    borderBottomWidth: 3,
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
