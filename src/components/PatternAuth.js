import React, { useEffect, useState } from 'react';
import { View, Text,PixelRatio } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GesturePassword from 'react-native-gesture-password';

const PatternAuth = ({}) => {
    const [password, setPassword] = useState(''); 
    const [status, setStatus] = useState('normal'); 
    const [message, setMessage] = useState('Please input your password.');
  
    const handleOnSetPassword = (newPassword) => {
      // Implement secure storage (e.g., AsyncStorage) and hashing (e.g., bcrypt) here (**crucial**)
      console.log('Password set (for demonstration only, replace with secure storage):', newPassword); // Replace with secure storage
      setPassword(newPassword); // Store hashed password in state (temporary)
      setStatus('right');
      setMessage('Password is set.');
    };
  
    const handleOnVerifyPassword = (typedPassword) => {
      // Compare the typed password with the securely stored and hashed password (**crucial**)
      if (typedPassword === password) { // Replace with secure comparison
        setStatus('right');
        setMessage('Password is correct.');
      } else {
        setStatus('wrong');
        setMessage('Password is incorrect. Try again.');
      }
    };
  
    // Helper function to reset state for next attempt
    const handleOnReset = () => {
      setStatus('normal');
      setMessage('Please input your password.');
    };

  

    const styles = {
        container: {
            flex: 1,
            height:'100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000', // Set background color (optional)
        },
        heading: {
            color: '#fff',
            fontSize: 20,
            marginTop: 50,
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        cell: {
            width: 20,
            height: 20,
            borderRadius: 25, // Set dot size and shape
            margin: 0,
            backgroundColor: 'white', // Remove default background
            alignItems: 'center',
            justifyContent: 'center',
        },
        cellSelected: {
            backgroundColor: '#fff', // White for selected dots
        },
        line: {
            width: 2,
            height: 'auto',
            backgroundColor: '#fff', // White for line
        },
    };
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.heading}>Authenticate Connect </Text>

            <GesturePassword
                onSetPassword={handleOnSetPassword}
                textStyle={{marginTop:60,color:'white'}}
                style={{ width: '100%', backgroundColor:'black', }}
                outerCircleStyle={{ backgroundColor: 'white' }} // Remove outer circle
                innerCircleStyle={{ backgroundColor: 'white' }} // Remove inner circle
                outerCircle={false}
                status={status}
                message={message}
                rightColor='green'
                normalColor='white'
                onStart={() => setStatus('normal')} // Reset on start
                onEnd={
                  password === ''
                    ? handleOnSetPassword 
                    : handleOnVerifyPassword // Verify password flow
                }
                onReset={handleOnReset}
           />
        <TouchableOpacity style={{height:100,width:'100%'}}><Text style={{color:'white',fontSize: PixelRatio.getFontScale() * 17,}}>User Finger print</Text></TouchableOpacity>
                
        </View>
       </>
    );
};

export default PatternAuth;
