import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
const CircleButton = ({title}) => {
  const navigation=useNavigation();
  const hadnleOnPress = () =>{
    navigation.navigate(title);
  }

  return (
    <TouchableOpacity onPress={hadnleOnPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: 35, 
        height: 35, 
        borderRadius: 17.5, 
        backgroundColor: config.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
      },
      text: {
        top:-1,
        fontSize: 26,
        color: config.buttonText,
      },
});

export default CircleButton;
