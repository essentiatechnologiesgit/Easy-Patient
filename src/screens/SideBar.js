import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import profileIcon from '../assets/profile.png';
import leftArrow from '../assets/leftArrow.png';
const Dashboard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={leftArrow} style={styles.arrow}></Image>
            </TouchableOpacity>
            <View style={{ marginBottom: 15 }}>
                <Image source={profileIcon} style={styles.Profilelogo} />
            </View>
            <View style={{ marginBottom: 12 }}>
                <Text style={styles.nameHeading}>MIsbah</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.emailHeading}>k201093@nu.edu.pk</Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.containerList}>
                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Appointments</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
                </View>

                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Reminders</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
            
                </View>
                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Prescriptions</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
            
                </View>
             
                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Guidelines</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
            
                </View>
                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Meal Plans</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
            
                </View>
                <View style={styles.appointments}>
                    <Text style={styles.sideText}>Health Recommendations</Text>
                    <Text style={styles.sideText}>{'>'}</Text> 
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2A2A31',
        padding: 20,
        flex: 1,

    },
    sideText: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: 'white',
    },
    appointments:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    horizontalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    containerList: {
        marginTop: 25,
        gap: 40,
    },
    Profilelogo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    nameHeading: {
        color: 'white',
        fontSize: PixelRatio.getFontScale() * 22,
        textAlign: 'center',
        fontWeight: '400',
    },
    emailHeading: {
        color: 'white',
        fontSize: PixelRatio.getFontScale() * 19,
        textAlign: 'center',
    },
    head: {
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
        left: '70%',
        color: 'black',
    },
    arrow: {
        height: 20,
        width: 20,
    },
    back: {
        backgroundColor: '#EAECEF',
        padding: 7,
        width: 36,
        height: 35,
        borderRadius: 20,
    },
});

export default Dashboard;
