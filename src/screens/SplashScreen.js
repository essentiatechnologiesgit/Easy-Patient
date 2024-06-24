import React, {useEffect} from 'react';
import {Image, View, StyleSheet, ImageBackground, Text} from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {
  const navigation=useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLoginResponse();
      }, 2000);
   
  }, []);

  const checkLoginResponse = async () => {
    try {
      const loginResponse = await AsyncStorage.getItem('loginResponse');
      if (loginResponse !== null) {
        // Data exists
        // const parsedResponse = JSON.parse(loginResponse);
        // console.log('Login response exists:', parsedResponse);
        navigation.navigate('Dashboard');
        // Perform further actions with the parsedResponse if needed
      } else {
        navigation.navigate('Login')
        // Data does not exist
        console.log('No login response found');
      }
    } catch (error) {
      console.error('Error retrieving login response:', error);
    }
  };

  return (
    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}> 
      <Image source={config.logo} style={styles.image} />
      <Image source={config.subLogo} style={styles.image} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:25,
  },
  image: {
    marginBottom:15,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  text:{
    color:'#e74c3c'
  }
});

export default SplashScreen;
