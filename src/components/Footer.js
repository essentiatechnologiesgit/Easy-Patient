import React, { useRef, useState,useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, PixelRatio, Animated } from 'react-native';
import more from '../assets/more.png';

import homeDark from '../assets/homeDark.png';
import { useNavigation } from '@react-navigation/native';
import calendar from '../assets/calendar.png';
import calendarDark from '../assets/calendarDark.png';
import home from '../assets/homeLight.png';
import jar from '../assets/jar.png';
import jarLight from '../assets/jarLight.png';

import Icon from 'react-native-vector-icons/FontAwesome';
const Footer = (props) => {
    const navigation = useNavigation();
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const indicatorX = useRef(new Animated.Value(0)).current;
    const [activeTab, setActiveTab] = useState(0);
   
    useEffect(() => {
        setActiveTab(props.prop);
      }, [props.prop]);

    const navigateSidebar = () => {
        navigation.navigate("SideBar");
    }

    return (
        <>
            <View style={styles.container}>

                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                        // moveIndicator(0);
                        navigation.navigate("Dashboard");
                    }}>
                    <Image source={activeTab === 0 ? homeDark : home} style={
                    [styles.icon,
                    activeTab === 1 && styles.activeTabIcon
                    ]}>
                </Image>
                {activeTab === 0 && <View style={styles.borderHome} />}

                <Text style={activeTab === 0 ? styles.textDark : styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    // moveIndicator(1),
                    navigation.navigate("Reminders");}}
            >
                {activeTab === 1 && <View style={styles.borderReminder} />}
                <Image
                    source={activeTab === 1 ? jar : jarLight}
                    style={styles.iconR}
                />
                <Text
                    style={activeTab === 1 ? styles.textDark : styles.text}
                >
                    Reminders
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    // moveIndicator(2),
                    navigation.navigate("Appointments");}}
            >
                {activeTab === 2 && <View style={styles.border} />}

                <Image source={activeTab === 2 ? calendarDark : calendar} style={styles.iconA}></Image>
                <Text style={activeTab === 2 ? styles.textDark : styles.text}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => navigateSidebar()}
            >
                <Image source={more} style={styles.iconM}></Image>
                <Text style={styles.text}>Mails</Text>
            </TouchableOpacity>

        </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#9CA29926',
        justifyContent: 'space-evenly',
        borderTopColor: '#00000033',
        // borderColor: '#00000033',
        elevation: 2,
        position: 'relative',
        height: 62,
    },
    textDark: {
        color: "#55565C",
    },
    iconR: {
        top: 3,
        height: 28,
        width: 24,
    },
    iconA: {
        top: 2,
        height: 26,
        width: 24,
    },

    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        position: 'relative',
    },
    borderHome: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        height: 3,
        backgroundColor: '#707070',
        marginTop: 2, // Adjust this value to control the distance between the border and the content
    },
    borderReminder: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        height: 3,
        backgroundColor: '#707070',
        marginTop: 2, // Adjust this value to control the distance between the border and the content
    },
    border: {
        position: 'absolute',
        top: 0,
        left: 30,
        right: 30,
        height: 3,
        backgroundColor: '#707070',
        marginTop: 2, // Adjust this value to control the distance between the border and the content
    },
    icon: {
        // top:1,
        height: 25,
        width: 25,
    },
    iconM: {
        top: 1,
        height: 25,
        width: 25,
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 14,
        color: '#55565CB3',
    },
    indicator: {
        position: 'absolute',
        height: 2,
        backgroundColor: '#707070',
        top: 0,
        left: 12,
    },
});

export default Footer;
