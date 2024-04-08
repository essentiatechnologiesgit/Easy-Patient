import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import BackHeader from '../components/backHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
const TermsAndConditions = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        getTerms();
    }, []);

    const getTerms = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/terms',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                setHtmlContent(response.data.message.text);
                setShowLoader(false);
            })
            .catch((error) => {
                console.log(error);
                setShowLoader(false);
            });
    };

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Terms & Conditions"} />

                    <WebView
                        originWhitelist={['*']}
                        source={{ html: `<html><head><style>body { font-size: 35px; }</style></head><body>${htmlContent}</body></html>` }}
                    />
                { showLoader &&  <ModalLoader />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
});

export default TermsAndConditions;
