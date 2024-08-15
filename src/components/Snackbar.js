import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image,PixelRatio } from 'react-native';
import config from '../../config.mjs';

const Snackbar = ({ message, keyProp }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    ).start(() => {
      setTimeout(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }
        ).start();
      }, 2000);
    });
  }, [fadeAnim, keyProp]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]} key={keyProp}>
      <View style={styles.logoContainer}>
        <Image source={config.logo} style={styles.logo} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 10,
        paddingHorizontal:25,
        borderRadius: 20,
        position: 'absolute',
        zIndex: 9999,
        width: '80%',
        bottom:'20%'
      },
      logoContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 1.5,
        marginRight: 8,
    
      },
      logo: {
        height: 20,
        width: 20,
       
      },
      message: {
        color: '#fff',
        fontSize: PixelRatio.getFontScale() * 18,
        fontFamily:config.fontStyle,
      },
});

export default Snackbar;
