import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../config';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false)
  const handleRegister = () => {
    // Replace with your actual validation and login logic (e.g., API call)
    if (username === 'admin' && password === 'test') {
      navigation.navigate('Dashboard')
    } else if (username === 'admin') {
      setShowPasswordInput(true)
    }
    else {
      alert('Invalid username or password!');
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  }

  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
      {/* <View style={styles.container}></View> */}
      <View style={styles.container}>
        <Image source={config.logo} style={styles.logo}></Image>
        <Image source={config.subLogo} style={styles.subLogo}></Image>
        <Text style={styles.signup}>Signup</Text>
        <TextInput
          style={styles.inputEmail}
          placeholder="E-mail"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.checkbox}>
        <CheckBox
          value={termsAccepted}
          onValueChange={() => { setTermsAccepted(!termsAccepted)}}
          tintColors={{true: config.secondaryColor}}
        />
        <Text style={styles.text}>I accept the </Text><Text style={[{textDecorationLine:'underline'},styles.text]}>Terms & Conditions</Text>
        </View>


        <TouchableOpacity
          style={[termsAccepted ? {backgroundColor : config.secondaryColor} : {backgroundColor : 'rgba(0,0,0,0)'},
            styles.loginButton]
          }
          onPress={handleRegister}
          disabled={!termsAccepted}
        >
          <Text style={[termsAccepted ? { color: config.tertiaryColor} : {color: config.secondaryColor}, {textAlign: 'center', fontSize: PixelRatio.getFontScale() * 18 } ]} >Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>

          <Text style={styles.login}>I already have an account</Text>
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
  checkbox:{
    width:'90%',
    justifyContent:'center',
    textAlign:'left',
    flexDirection:'row'
  },
  text:{
    fontSize:PixelRatio.getFontScale()*18,
    padding:2,
    flexDirection:'row',
    textAlign:'center',
    alignItems:'center',
  }
});

export default SignupScreen;
