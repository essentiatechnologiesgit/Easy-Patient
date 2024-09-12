import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio,TouchableWithoutFeedback,Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useTranslation } from 'react-i18next';

dayjs.extend(advancedFormat);
const AppointmentContainer = ({ record, isArchived, isHide, isShow, record_id }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const statusMapping = {
        1: t('Waiting'),
        2: t('Confirmed'),
        3: t('Cancelled'),
    };
    const statusName = statusMapping[record.schedule_status_id] || 'null';
    const dateTime = moment(record.date);
    const formattedTime = dateTime.format('HH:mm');
    const formattedDate = dayjs().format('ddd, MMMM Do YYYY');
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
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AppointmentsDetails', { record: record, isArchived,isArchived })}>
                <View style={styles.Appointments}>
                    <View style={styles.contentWrapper}>
                        <View style={styles.head}>
                            <Text style={styles.headings}>{formattedTime}</Text>
                            <Text style={[styles.statusText, getStatusStyle(statusName)]}>{statusName}</Text>
                        </View>
                        <Text style={styles.headings}>{formattedDate}</Text>
                        <Text style={styles.subHeading}>{record.clinic}</Text>
                        <Text style={styles.subHeading}>Dr(a). {record.specialist}</Text>
                        <Text style={styles.subHeading}>{record.type}</Text>
                    </View>
                    <Image source={arrow} style={styles.arrowLogo} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    Appointments: {
        flexDirection: 'column',
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: config.primaryColor,

    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 18,
        fontWeight: '600',
    },
    subHeading: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        
    },
    confirmed: {
        color: '#50B76C',
        fontSize: PixelRatio.getFontScale() * 17,
        
    },
    waiting:{
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        
    },
    cancelled:{
        color: '#54A5B8',
        fontSize: PixelRatio.getFontScale() * 17, 
        
    },
    contentWrapper: {
        flex: 1, // Ensure the content takes all available space
        gap:2,
    },
    arrowLogo: {
        position: 'absolute', // Position the arrow absolutely
        top: 50, // Adjust this value as needed
        right: 0,
        height:18,
        width:11, // Position the arrow to the right
    },
});

export default AppointmentContainer;
