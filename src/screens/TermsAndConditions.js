import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, PixelRatio, TouchableWithoutFeedback, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BackHeader from '../components/backHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
const TermsAndConditions = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { setTermsAccepted = null, isConfigure } = route.params || {};
    const [htmlContent, setHtmlContent] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
        getTerms();
    }, []);

    const getTerms = async () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/terms',
            headers: {
                'Authorization': `Bearer 23359af9135bd2a98358a31eaa161255b4f42bf7`
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
               
                {
                    !isConfigure ? 
                    <View style={styles.heading}>               
                        <Text style={styles.termsHeading}>{t('Terms&Conditions')}</Text>
                        {
                            Platform.OS === 'android' && 
                            <Text style={styles.subHeading}>By clicking Agree, you are accepting the terms below</Text>
                        }
                    </View>
                    :
                    <>
                    <BackHeader name={"Terms and Conditions"} />
                    <View style={{marginTop:20}}></View>
                    </>
                }
                <WebView
                    originWhitelist={['*']}
                    source={{ html: `<html><head><style>body { font-size: 35px; }</style></head><body>${htmlContent}</body></html>` }}
                />
                {
                    !isConfigure &&
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => { setTermsAccepted(true), navigation.navigate('Signup') }} >
                            <Text style={styles.btnText}>{t('Agree')}</Text>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate('Signup') }} >
                            <Text style={styles.btnCancel}>{t('Cancel')}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                }

                {showLoader && <ModalLoader />}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
    },
    heading: {
        padding: 8,
        ...Platform.select({
            ios: {
                marginTop: 38,
            },
        })
    },
    btnText: {
        color: config.buttonText,
        fontSize: PixelRatio.getFontScale() * 16,

    },
    btnCancel: {
        color: config.primaryColor,
        textDecorationLine: 'underline',
        fontSize: PixelRatio.getFontScale() * 16,
    },
    btn: {
        backgroundColor: config.secondaryColor,
        padding:5,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsHeading: {
        fontSize: PixelRatio.getFontScale() * 23,
        color: config.textColorHeadings,
        ...Platform.select({
            ios: {
                marginTop: 30,
                textAlign:'center',
                marginBottom:20,
            },
            android:{
                fontWeight: '800',
       
            }
        })
    },
    subHeading: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 18,
        marginTop: 10,
        marginBottom: 20,
    },
    footerContainer: {
        height: 90,
        padding: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
});

export default TermsAndConditions;
