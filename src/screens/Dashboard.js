import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import Svg, { Path } from 'react-native-svg';
import AlertIcon from '../components/AlertIcon';
import OtpInput from '../components/OTPInput';
import FolderSlider from '../components/FolderSlider';
const Dashboard = () => {
    const navigation = useNavigation();


    return (
        <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
            <View style={styles.HeaderContainer}>
                <Image source={config.logo} style={styles.logo}></Image>
                <Image source={profileIcon} style={styles.Profilelogo}></Image>   
            </View>
            <View style={styles.NameContainer}> 
                <Text style={styles.nameHeading}>Hello Misbah!</Text>
                <Text style={styles.nameSideHeading}>Welcome to Easy Patient</Text>
            </View>
            <View style={styles.sliderContainer}>
                <FolderSlider />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        marginTop: '20%'
    },
    sliderContainer:{
        height:'14%',
        marginTop:'20%',
        marginLeft:20,
        marginRight:10,
    },  
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    NameContainer:{
        marginLeft:12,
    },
    nameHeading:{
        marginTop:'5%',
        fontWeight: 'bold',
        fontSize: PixelRatio.getFontScale() * 26,
        color: config.textColorHeadings,
    },
    logo: {
        width: '12%',
        resizeMode: 'contain',
    },
    Profilelogo:{
        width: '10%',
        height:'60%',
        resizeMode: 'contain',
    },
    HeaderContainer: {
        justifyContent: 'space-between',
        marginRight:10,
        marginLeft:10,  
        flexDirection:'row',
        alignItems:'center',
    },
    nameSideHeading:{
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
    },
});

export default Dashboard;
