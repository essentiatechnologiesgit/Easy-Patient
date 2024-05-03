import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import archive from '../assets/archive.png';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import AttestationsContainer from '../components/AttestationContainer';
import AssessmentsConatiner from '../components/AssessmentsContainer';

const BodyAssessments = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Body Assessments"} />
                <TouchableOpacity onPress={() => navigation.navigate("BodyAssessmentsArchive")} style={styles.touch}>
                    <Image source={archive} style={styles.archiveIcon} />
                </TouchableOpacity>
                <ScrollView>
                <AssessmentsConatiner />
                </ScrollView>
                {/* <View style={styles.Empty}>
                    <Text style={styles.emptyText}>You do not have any Attestations/Declarations</Text>
                </View> */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '70%',
        alignSelf: 'center'
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    archiveIcon: {
        height: 25,
        width: 25,
        margin: 20,
    },
    touch:{
        position:'absolute',
        top:0,
        right:0,
    },
});

export default BodyAssessments;
