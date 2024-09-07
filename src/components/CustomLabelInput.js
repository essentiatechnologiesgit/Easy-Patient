import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import config, { primaryColor } from '../../config';
import Dashboard from '../screens/Dashboard';

const FloatingLabelInput = ({ value, onChangeText, doseError }) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = new Animated.Value(value ? 1 : 0); // Initial position based on value
    console.log(doseError);
    // Animate label when focus or value changes
    useEffect(() => {
        Animated.timing(labelPosition, {
            toValue: isFocused || value ? 1 : 0, // Move up if focused or has value
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        color: 'red',
        left: 5,
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 0], // Adjust label position
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [17, 13], // Adjust font size
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [doseError ? 'red' : config.primaryColor, doseError ? 'red' : config.primaryColor], // Adjust color when floating
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={labelStyle}>
                Dose
            </Animated.Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={isFocused ? 'Ex: 1 tablet, 2 teaspoons, 10 drops...' : ''}
                style={[styles.input, { borderColor: doseError ? 'red' : config.primaryColor }]} // Change border on focus
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            // keyboardType="ascii-capable"
            />
            {
                doseError &&
                <Text style={{ color: 'red' }}>Enter dosage</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderBottomWidth: 1,
    },
});

export default FloatingLabelInput;
