import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio,TouchableWithoutFeedback,Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
const AppointmentContainer = () => {
    const navigation = useNavigation();
    return (
        <>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("AppointmentsDetails")}>
                <View style={styles.Appointments}>
                    <View style={styles.contentWrapper}>
                        <View style={styles.head}>
                            <Text style={styles.headings}>09:30</Text>
                            <Text style={styles.confirmed}>Confirmed</Text>
                        </View>
                        <Text style={styles.headings}>Thu, December 5th</Text>
                        <Text style={styles.subHeading}>Floriano Polis Clinic</Text>
                        <Text style={styles.subHeading}>Return</Text>
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
        fontSize: PixelRatio.getFontScale() * 20,
        fontWeight: 'bold',
    },
    subHeading: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    confirmed: {
        color: '#50B76C',
        fontSize: PixelRatio.getFontScale() * 17,
    },
    contentWrapper: {
        flex: 1, // Ensure the content takes all available space
    },
    arrowLogo: {
        position: 'absolute', // Position the arrow absolutely
        top: 50, // Adjust this value as needed
        right: 0, // Position the arrow to the right
    },
});

export default AppointmentContainer;
