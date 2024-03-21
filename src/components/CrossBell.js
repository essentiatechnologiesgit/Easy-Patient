import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CrossBellIcon from '../assets/crossBell.png';
const CrossBell = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.child}>
                <Image source={CrossBellIcon} style={styles.bell}></Image>
                <Text style={styles.text}>21:06 - Alarm </Text>
                </View>
                <View style={styles.reminder}></View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {    
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 80,
        padding:10,
        alignSelf: 'center',
    },
    reminder:{
        height:20,
        width:'96%',
        backgroundColor:'#e8e8e8',
    },
    child:{
        flexDirection:'row',
    },
    text:{
        marginLeft:8,
        color:'black',
    },
    bell:{
        height:20,
        width:20,
    }
});

export default CrossBell;
