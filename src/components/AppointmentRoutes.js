import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import CarIcon from '../assets/CarIcon.png';
import { useNavigation, useRoute } from '@react-navigation/native';
const AppointmentRoutes = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.firstContainer}>
                <View style={styles.head}>
                    <Text style={styles.status}>Routes</Text>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.routeHead}>Clinic Florianopolis</Text>
                <Text style={styles.routeText}>Rua Hercillio Luz, 810 - sala 1102 Centro, Florianopolis/SC</Text>
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
