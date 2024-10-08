import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const AppointmentStatus = ({scheduleStatusId,scheduleStatusName}) => {
    const { t } = useTranslation();
    const statusMapping = {
        1: t('Waiting'),
        2: t('Confirmed'),
        3: t('Cancelled'),
    };
    const navigation = useNavigation();
    const statusName = statusMapping[scheduleStatusId] || 'null';
    const getStatusStyle = (status) => {
        switch (status) {
            case t('Waiting'):
                return styles.waiting;
            case t('Confirmed'):
                return styles.confirmed;
            case t('Cancelled'):
                return styles.cancelled;
            default:
                return styles.defaultStatus;
        }
    };
    return (
        <>
            <View style={styles.firstContainer}>
                <View style={styles.head}>
                    <Text style={styles.status}>Status</Text>
                    <Text style={[ getStatusStyle(statusName)]}>{statusName}</Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.bodyHead}>{t('ThisConsultation')}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    bodyText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    status: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
    },
    firstContainer: {
        padding: 20,
        // backgroundColor: 'grey',
    },
    head: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bodyHead: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
    },
    confirmed: {
        color: '#50B76C',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    waiting:{
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    cancelled:{
        color: '#54A5B8',
        fontSize: PixelRatio.getFontScale() * 17, 
        fontFamily:config.fontStyle,
    },
    line: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
});

export default AppointmentStatus;
