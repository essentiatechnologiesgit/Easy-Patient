import React, {useEffect} from 'react';
import {Image, View, StyleSheet, ImageBackground, Text} from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const SplashScreen = () => {
  const navigation=useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login'); 
    }, 3000);
  }, []);

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
