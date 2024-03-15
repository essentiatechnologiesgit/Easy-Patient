import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet,PixelRatio } from 'react-native';
import config from '../../config';
const OtpInput = ({ onChange }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus to next input field
      if (value !== '' && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
      
      // Pass OTP to parent component
      onChange(newOtp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={value => handleOtpChange(index, value)}
          ref={inputRefs[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap:20,
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
    height: 62,
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'center',
    borderWidth: 2.5,
    borderRadius:5,

    borderColor: config.secondaryColor,
  },
});

export default OtpInput;
