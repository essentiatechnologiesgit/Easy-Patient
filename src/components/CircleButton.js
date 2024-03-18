import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import config from '../../config';

const CircleButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: 35, 
        height: 35, 
        borderRadius: 20, 
        backgroundColor: config.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
      },
      text: {
        top:-2,
        fontSize: 26,
        color: 'white',
      },
});

export default CircleButton;
