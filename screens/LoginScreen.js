import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground,Image,PixelRatio,TouchableOpacity } from 'react-native';
import config from '../config';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation=useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput]=useState(false)
  const handleLogin = () => {
    // Replace with your actual validation and login logic (e.g., API call)
    if (username === 'admin' && password === 'test') {
      navigation.navigate('Dashboard')
    } else if(username === 'admin'){
      setShowPasswordInput(true)
    }
    else {
      alert('Invalid username or password!');
    }
  };

  const handleRegister=()=>{
    navigation.navigate('Signup')
  }

  const handleForgotPassword=()=>{
    navigation.navigate('ForgotPassword')
  }
  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
     {/* <View style={styles.container}></View> */}
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
        {showPasswordInput && <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />}

        
        <TouchableOpacity
            style={
              styles.loginButton
            }
            onPress={handleLogin}
          >
            <Text style={{ color: config.tertiaryColor,textAlign:'center' , fontSize: PixelRatio.getFontScale()*18}}>Next</Text>
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
    marginTop:'20%'
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
    fontSize:PixelRatio.getFontScale()*18,
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
    fontSize:PixelRatio.getFontScale()*18,
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
    width:'90%',
    height:40,
    marginTop:40,
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    fontSize:PixelRatio.getFontScale() * 18,
    backgroundColor: config.secondaryColor, // Set background color directly
  },
  forgotPassword:{
    justifyContent:'flex-end',
    width:'90%',
    marginTop:20, 
  },
  forgotPasswordText:{
    textDecorationLine: 'underline',
    textAlign:'right',
    fontSize:PixelRatio.getFontScale() * 18
  },
  register:{
    paddingTop:'15%',
    textDecorationLine: 'underline',
    color:config.secondaryColor,
    fontSize: PixelRatio.getFontScale() * 18
  }
});

export default LoginScreen;
