import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import faceID from '../assets/faceID.png';
import touchId from '../assets/TouchId.png';
import config from '../../config.js';
const CustomButton = ({ buttonColor, borderColor, textColor, text, onPress, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor, borderColor: borderColor }]}
        onPress={onPress}
      >
        {
          title === "authorization" &&
          <>
            <View style={styles.parent}>
              <Image source={touchId} style={styles.selectedImage2} />
              <View style={styles.line}></View>
              <Image source={faceID} style={styles.selectedImage} />
            </View>
          </>
        }
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  line: {
    borderLeftWidth: 2, 
    borderLeftColor: config.buttonText,
    height: 20, 
    marginHorizontal: 'auto',
  },
  selectedImage: {
    height: 20,
    width: 20,
  },
  parent: {
    flexDirection: 'row',
    gap: 10,
    marginEnd: 10,
    alignItems: 'center',
  },
  selectedImage2: {
    height: 25,
    width: 25,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    borderWidth: 1,
    width: '90%',
    elevation: 3,
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
