import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const Biometric = () => {
    const [authType, setAuthType] = useState('');
    const [error, setError] = useState('');
    const rnBiometrics = new ReactNativeBiometrics();

    const authenticateWithBiometrics = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint',cancelButtonText:'Use Pattern'  })
            .then((resultObject) => {
                const { success } = resultObject;
                if (success) {
                    console.log('Successful biometrics provided');
                } else {
                    handlePattern();
                }
            })
            .catch(() => {
                console.log('Biometrics failed');
            });
    };

    const usePatternAuthentication = () => {
        // Implement pattern authentication logic here
        console.log('Pattern authentication');
    };

    handlePattern = () =>{
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>Confirm Fingerprint</Text>
            <Button title="Authenticate with Biometrics" onPress={authenticateWithBiometrics} />
            <Button title="Use Pattern" onPress={usePatternAuthentication} />
            {error !== '' && <Text>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prompt: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default Biometric;
