import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AppointmentStatus from '../components/AppointmentStatus';
import BackHeader from '../components/backHeader';
import Footer from '../components/Footer';
import AppointmentScheduling from '../components/AppointmentScheduling';
import AppointmentRoutes from '../components/AppointmentRoutes';
import AppointmentContact from '../components/AppointmentContact';
const AppointmentsDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { record, isArchived } = route.params;
    const scrollViewRef = useRef();
    // console.log(record.longitude);
    return (
        <>
            <ScrollView style={styles.container}>
                <BackHeader name={"Appointments"} />
                <AppointmentStatus scheduleStatusId={record.schedule_status_id} scheduleStatusName={record.schedule_status_name} />
                <AppointmentScheduling date={record.date} responsible={record.specialist} local={record.clinic} query={record.type} />
                <AppointmentRoutes clinicName={record.clinic} address={record.address} latitude={record.latitude} longitude={record.longitude}  />
                <AppointmentContact watsappNo={record.watsapp_value} phone={record.phone} email={record.email} />
            </ScrollView>
            <Footer prop={2} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
    },
    head: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    carIcon: {
        height: 23,
        width: 26,
    },
    list: {
        padding: 5,
        gap: 10,
    },
    routeHead: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontWeight: 'bold',
    },
    routeText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    bodyHead: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontWeight: 'bold',
    },

    line: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
    bodyText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    status: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontWeight: 'bold',
    },
    firstContainer: {
        padding: 20,
        // backgroundColor: 'grey',
    },
});

export default AppointmentsDetails;
