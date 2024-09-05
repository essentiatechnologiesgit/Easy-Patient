import React, {useEffect,useState} from 'react';
import {Image, View, StyleSheet, ImageBackground, Text} from 'react-native';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const SplashScreen = () => {
  const navigation=useNavigation();
  const [permissionsGranted, setPermissionsGranted] = useState({
    location: false,
    camera: false,
    storage: false,
  });
  useEffect(() => {
    setTimeout(() => {
      checkLoginResponse();
      }, 2000);
  }, []);

  const checkLocationPermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else if (Platform.OS === 'ios') {
      result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
    return result;
  };

  const checkCameraPermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await check(PERMISSIONS.ANDROID.CAMERA);
    } else if (Platform.OS === 'ios') {
      result = await check(PERMISSIONS.IOS.CAMERA);
    }
    return result;
  };  

  const checkStoragePermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
    return result;
  };

  const checkLoginResponse = async () => {
    try {
      const loginResponse = await AsyncStorage.getItem('loginResponse');
      if (loginResponse !== null) {

        navigation.navigate('Dashboard');
      } else {
        // const location = await checkLocationPermission();
        // const camera = await checkCameraPermission();
        // const storage = await checkStoragePermission();
        // if (location === "granted" && camera === "granted" && storage === "limited" ||  storage === "granted") {
        //   navigation.navigate('Login');
        // }
        //  else {
          navigation.navigate('IntroScreens');
        // }
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
