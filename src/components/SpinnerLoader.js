import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../config.mjs';
const MyComponent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(!isLoading);
    };

    return (
        <View>
            <Spinner
                visible={true}
                customIndicator={<ActivityIndicator size="large" color={config.secondaryColor} />}
            />

        </View>
    );
};

export default MyComponent;
