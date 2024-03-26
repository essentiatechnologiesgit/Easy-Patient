import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BellIcon from '../assets/bellIcon.png';
const BellAlarm = ({time,Medicine}) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }

    return (
        <>
            <View style={styles.container}>
                <Image source={BellIcon} style={styles.bell}></Image>
                <Text style={styles.text}>{time} - {Medicine} </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 40,
        padding:10,
        alignSelf: 'center',
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

export default BellAlarm;
