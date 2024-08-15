import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Path } from 'react-native-svg'; // Import Path from react-native-svg
import calendarDark from '../assets/calendarDark.png';
import config from '../../config.mjs';
const Schedule = ({ time, prescriptionText }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
               <Image source={calendarDark } style={styles.iconA}></Image>
               <View>
                <Text style={styles.textA}>Thu, December 5 at 18.08</Text>
                <Text style={styles.textB}>ABC Clinic</Text>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 6,
        backgroundColor: config.modalColor,
        width: '92%',
        height: 80,
        padding: 10,
        alignSelf: 'center',
    },
    iconA:{
        height:25,
        width:23,
        marginLeft:5,
    },
    textA:{
        marginLeft:20,
        width:'90%',
        color:'#2A2A31',
        fontSize: PixelRatio.getFontScale() * 15,
        fontFamily:config.fontStyle,
    },
    textB:{
        marginLeft:20,
        width:'90%',
        color:'#55565C',
        fontSize: PixelRatio.getFontScale() * 14,
        fontFamily:config.fontStyle,
    },
});

export default Schedule;
