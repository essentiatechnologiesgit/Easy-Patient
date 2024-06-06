import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import arrow from '../assets/arrow.png';
import BackHeader from '../components/backHeader';
import Footer from '../components/Footer';
import AppointmentContainer from '../components/AppointmentContainer';
const Appointments = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Appointments"} />
                <ScrollView>
                    <AppointmentContainer />
                </ScrollView>
            </View>
            <Footer prop={2} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
});

export default Appointments;
