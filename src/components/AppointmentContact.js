import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import EmailComponent from './EmailComponent';
import GoldEmailIcon from '../assets/goldEmailIcon.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import CallComponent from './CallComponent';
import WhatsappComponent from './WatsappComponent';
const AppointmentContact = ({ watsappNo, phone, email }) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.firstContainer}>
                {
                    phone && watsappNo && email &&
                    <View style={styles.head}>
                        <Text style={styles.status}>Contacts</Text>
                    </View>
                }

                <View style={styles.line}></View>
                {
                    phone &&
                    <CallComponent phone={phone} />
                }
                {
                    watsappNo &&

                    <WhatsappComponent watsappNo={watsappNo} />
                }
                {
                    email &&
                    <EmailComponent email={email} />
                }

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    firstContainer: {
        padding: 20,
    },
    status: {
        color: config.secondaryColor,
    },
    watsappIcon: {
        height: 25,
        width: 25,
    },
    clinicText: {
        color: config.secondaryColor,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    emailIcon: {
        width: 28,
        height: 20,
    },
    carContainer: {
        marginTop: 10,
        borderColor: config.secondaryColor,
        borderWidth: 2,
        borderRadius: 6,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 20,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
    },
    subHeading: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    confirmed: {
        color: '#50B76C',
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
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

export default AppointmentContact;
