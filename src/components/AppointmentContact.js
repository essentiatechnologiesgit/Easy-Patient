import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio,TouchableWithoutFeedback,Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import callIcon from '../assets/callIcon.png';
import watsappIcon from '../assets/watsappIcon.png';
import GoldEmailIcon from '../assets/goldEmailIcon.png';
import { useNavigation, useRoute } from '@react-navigation/native';
const AppointmentContact = () => {
    const navigation = useNavigation();
    return (
        <>
                <View style={styles.firstContainer}>
                    <View style={styles.head}>
                        <Text style={styles.status}>Contacts</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.carContainer}>
                        <Image source={callIcon} style={styles.callIcon} />
                        <Text style={styles.clinicText}>0321546351564</Text>
                        <Text></Text>
                    </View>
                    <View style={styles.carContainer}>
                        <Image source={watsappIcon} style={styles.watsappIcon} />
                        <Text style={styles.clinicText}>0321546351564</Text>
                        <Text></Text>
                    </View>
                    <View style={styles.carContainer}>
                        <Image source={GoldEmailIcon} style={styles.emailIcon} />
                        <Text style={styles.clinicText}>syedmisbahali1111@gmail.com</Text>
                        <Text></Text>
                    </View>
                </View>
        </>
    );
};

const styles = StyleSheet.create({
    Appointments: {
        flexDirection: 'column',
        padding: 12,
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: config.primaryColor,
    },
    firstContainer: {
        padding: 20,
        // backgroundColor: 'grey',
    },
    callIcon:{
        height:28,
        width:26,
    },

    watsappIcon:{
        height:25,
        width:25,
    },
    clinicText: {
        color: config.secondaryColor,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
    },
    emailIcon:{
        width:28,
        height:20,
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

export default AppointmentContact;
