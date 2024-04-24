import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
const AppointmentStatus = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.firstContainer}>
                <View style={styles.head}>
                    <Text style={styles.status}>Status</Text>
                    <Text style={styles.status}>Waiting</Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.bodyHead}>Appointment awaiting confirmation</Text>
                <Text style={styles.bodyText}>Consult , change or cancel your appointment , contact the clinic using the contact details below</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
    head: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
});

export default AppointmentStatus;
