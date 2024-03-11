import React, {useEffect} from 'react';
import {Image, View, StyleSheet, Dimensions, Text} from 'react-native';
import config from '../config';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const SplashScreen = () => {
  const navigation=useNavigation();
  useEffect(() => {
    setTimeout(() => {
      // Redirect to dashboard after 3 seconds
      navigation.navigate('Login'); // Assuming you have navigation setup
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Image source={config.splashScreen} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text:{
    color:'#e74c3c'
  }
});

export default SplashScreen;
