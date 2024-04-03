import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, Switch, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
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
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';

const Configure = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [priority, setPriority] = useState('');

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Configure"} />
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={priority ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                    // onValueChange={togglePrioritySwitch}
                    // value={priority}
                    />
                    <Text style={styles.mainText}>Notify the time to take the medicine</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={priority ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                    // onValueChange={togglePrioritySwitch}
                    // value={priority}
                    />
                    <Text style={styles.mainText}>Open this app together with the medicine reminder</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={priority ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                    // onValueChange={togglePrioritySwitch}
                    // value={priority}
                    />
                    <Text style={styles.mainText}>Notify appointment dates</Text>
                </View>
                <View style={styles.configureSideContainer}>
                    <Text style={styles.sideText}>You will be notified twice : 24 hours in advance, and 2 hours before the schedule time</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={priority ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={togglePrioritySwitch}
                        // value={priority}
                    />
                    <Text style={styles.mainText}>Allow the app to run in the background</Text>
                </View>
                <View style={styles.configureSideContainer}>
                    <Text style={styles.sideText}>To recieve notification on time , enable the permisison</Text>
                </View>
                <View style={styles.configureContainer}>
                    <Switch
                        trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                        thumbColor={priority ? config.secondaryColor : config.primaryColor}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={togglePrioritySwitch}
                        // value={priority}
                    />
                    <Text style={styles.mainText}>Allow the app to enable FaceID/Fingerprint Authentication</Text>
                </View>
                <TouchableOpacity style={styles.terms}><Text style={styles.termsText}>Terms & Conditions</Text></TouchableOpacity>
                <TouchableOpacity style={styles.delete}><Text style={styles.deleteText}>Delete Account</Text></TouchableOpacity>
                
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
    terms:{
        alignSelf:'center',
        marginTop:35,
    },
    deleteText:{
        color:'red',
        textDecorationLine:'underline',
    },
    termsText:{
        color:config.primaryColor,
        textDecorationLine:'underline',
    },
    delete:{
        alignSelf:'center',
        marginTop:30,
    },
    configureContainer: {
        marginTop: 30,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    configureSideContainer: {
        width: '85%',
        alignSelf: 'center',
    },
    mainText: {
        color: config.textColorHeadings,
        width: '90%',
    },
    sideText: {
        color: config.primaryColor,
        width: '90%',
        marginLeft:'10%',
    },
});

export default Configure;
