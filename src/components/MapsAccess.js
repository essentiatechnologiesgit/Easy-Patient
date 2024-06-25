import React, { useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, PixelRatio } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import handMap from '../assets/handMap.png';
import CustomButton from './CustomizedButton';


const MapsAccess = () => {
    const navigation = useNavigation();

    

    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>Find the best route to your clinic</Text>
            <Image source={handMap} style={styles.image} />
            <Text style={styles.text}>Provide access to your location services to find the best routes to your clinics</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
    },
    heading: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 25,
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center',
        marginTop: -40,
    },
    image: {
        // marginTop:100,
        width: 245,
        height: 200,

    },
    text: {
        color: config.textColorHeadings,
        width: '50%',
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 16,
    }
});

export default MapsAccess;
