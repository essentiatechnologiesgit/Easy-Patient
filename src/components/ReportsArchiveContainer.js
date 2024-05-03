import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import showIcon from '../assets/showIcon.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const ReportsArchiveContainer = () => {
    const navigation = useNavigation();
    return (
        <>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('ReportsView')}>
                <View style={styles.container}>
                    <Text style={styles.headings}>Recieved 05/06/21</Text>
                    <Text style={styles.text}>Florianopolis Clinic</Text>
                    <Text style={styles.text}>Dr Jose Paulo Fontes</Text>
                    <TouchableOpacity style={styles.hideContainer}>
                        <Image source={showIcon} style={styles.showIcon} />
                        <Text style={styles.hide}>Show</Text>
                    </TouchableOpacity>
                    <Image source={arrow} style={styles.arrowLogo} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
    },
    showIcon: {
        height: 16,
        width: 14,
    },
    NewContainer: {
        height: 25,
        width: 38,
        position: 'absolute',
        right: 0,
        top: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B8E0C3',
    },
    New: {
        color: '#146229',
        fontSize: PixelRatio.getFontScale() * 12,
    },
    arrowLogo: {
        position: 'absolute', // Position the arrow absolutely
        height: 20,
        width: 13,
        top: 40, // Adjust this value as needed
        right: 0, // Position the arrow to the right
    },
    headings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontWeight: 'bold',
    },
    hideContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: config.secondaryColor,
        height: 25,
        width: 62,
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginTop: 5,
    },
    hide: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 12,
    },
    subHeadings: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 16,
        fontWeight: 'bold',
    },
    text: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 16,
    },
});

export default ReportsArchiveContainer;
