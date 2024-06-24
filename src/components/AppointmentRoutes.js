import React, { useState, useRef, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import CarIcon from '../assets/CarIcon.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
const AppointmentRoutes = ({clinicName,address}) => {
    const navigation = useNavigation();

    // Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY');
    // useEffect(() => {
    //     // Example for geocoding
    //     Geocoder.from('1600 Amphitheatre Parkway, Mountain View, CA')
    //       .then(json => {
    //         const location = json.results[0].geometry.location;
    //         console.log(location);
    //       })
    //       .catch(error => console.warn(error));
    
    //     // Example for reverse geocoding
    //     Geocoder.from(37.4219983, -122.084)
    //       .then(json => {
    //         const addressComponent = json.results[0].address_components[0];
    //         console.log(addressComponent);
    //       })
    //       .catch(error => console.warn(error));
    //   }, []);
    
    return (
        <>
            <View style={styles.firstContainer}>
                <View style={styles.head}>
                    <Text style={styles.status}>Routes</Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.routeHead}>{clinicName}</Text>
                <Text style={styles.routeText}>{address.street}, {address.number} {address.neighborhood} {address.city_name}</Text>
                <View style={styles.carContainer}>
                    <Image source={CarIcon} style={styles.carIcon} />
                    <Text style={styles.clinicText}>Go to the Clinic</Text>
                    <Text></Text>
                </View>
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
    carContainer: {
        marginTop: 10,
        borderColor: config.secondaryColor,
        borderWidth: 2,
        borderRadius: 6,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    clinicText:{
        color:config.secondaryColor,
    },
    carIcon: {
        height: 23,
        width: 26,
    },
    firstContainer: {
        padding: 20,
        // backgroundColor: 'grey',
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

export default AppointmentRoutes;
