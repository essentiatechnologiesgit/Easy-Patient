import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
import archiveGold from '../assets/archiveGold.png';
import { TouchableOpacity } from 'react-native';
const AttestationContainer = () => {
    const navigation = useNavigation();
    return (
        <>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('AttestationsView')}>
                <View style={styles.container}>
                    <Text style={styles.headings}>Recieved 05/06/21</Text>
                    <Text style={styles.text}>Florianopolis Clinic</Text>
                    <Text style={styles.text}>Dr Jose Paulo Fontes</Text>
                    <TouchableOpacity style={styles.hideContainer} >
                        <Image source={archiveGold} style={styles.archiveIcon} />
                        <Text style={styles.hide}>hide</Text>
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
    archiveIcon: {
        height: 15.5,
        width: 13,
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
        alignItems: 'center',
        gap: 3,
        borderWidth: 1,
        borderColor: config.secondaryColor,
        height: 25,
        width: 60,
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

export default AttestationContainer;
