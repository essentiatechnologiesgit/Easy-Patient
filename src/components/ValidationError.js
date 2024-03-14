import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ValidationError = ({ errorMessage }) => {
    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.triangle} />
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    errorMessageContainer: {
        position: 'relative',
        backgroundColor: 'white',
        top: 5,
        left: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderTopColor: 'red',
        borderTopWidth: 3,
        marginBottom: -37,
        zIndex: 999,
      },
      errorText: {
        textAlign: 'right',
      },
      triangle: {
        position: 'absolute',
        top: 0,
        right: '2%',
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
      },
});

export default ValidationError;
