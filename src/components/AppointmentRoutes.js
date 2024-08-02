import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, PixelRatio, PermissionsAndroid, TouchableOpacity, Linking } from 'react-native';
import config from '../../config';
import CarIcon from '../assets/CarIcon.png';
import MapView, { Marker } from 'react-native-maps';

const AppointmentRoutes = ({ clinicName, address, longitude, latitude }) => {
    const [locationPermission, setLocationPermission] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, []);
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location so you can see your location on the map.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission granted");
                setLocationPermission(true);
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

   
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <>
            <View style={styles.firstContainer}>
                <View style={styles.head}>
                    <Text style={styles.status}>Routes</Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.routeHead}>{clinicName}</Text>
                <Text style={styles.routeText}>
                    {address.street}, {address.number} {address.neighborhood} {address.city_name}
                </Text>
                {
                    longitude && latitude &&
                    <TouchableOpacity onPress={openGoogleMaps} style={styles.carContainer}>
                        <Image source={CarIcon} style={styles.carIcon} />
                        <Text style={styles.clinicText}>Go to the Clinic</Text>
                    </TouchableOpacity>
                }

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    // Your existing styles
    bodyText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    status: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
    },
    carContainer: {
        marginTop: 10,
        borderColor: config.secondaryColor,
        borderWidth: 2,
        borderRadius: 6,
        flexDirection: 'row',
        padding: 10,
        // justifyContent: 'space-between',
    },
    clinicText: {
        color: config.secondaryColor,
        marginLeft: '30%',
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
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
    },
    routeText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    bodyHead: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
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

    line: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
});

export default AppointmentRoutes;
