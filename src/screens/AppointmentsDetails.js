import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import arrow from '../assets/arrow.png';
import callIcon from '../assets/callIcon.png';
import watsappIcon from '../assets/watsappIcon.png';
import GoldEmailIcon from '../assets/goldEmailIcon.png';
import AppointmentStatus from '../components/AppointmentStatus';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import Footer from '../components/Footer';
import AppointmentScheduling from '../components/AppointmentScheduling';
import AppointmentRoutes from '../components/AppointmentRoutes';
import AppointmentContact from '../components/AppointmentContact';
const AppointmentsDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

    return (
        <>
            <ScrollView style={styles.container}>
                <BackHeader name={"Appointments"} />
                <AppointmentStatus />

                <AppointmentScheduling />

                <AppointmentRoutes />

                <AppointmentContact />
            </ScrollView>
            <Footer prop={2} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
