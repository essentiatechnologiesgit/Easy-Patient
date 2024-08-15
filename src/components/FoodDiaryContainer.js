import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config.mjs';
import { useNavigation, useRoute } from '@react-navigation/native';
const AppointmentContainer = ({ record }) => {
    const navigation = useNavigation();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const formatTime = (timeString) => {
        const dummyDate = new Date("2000-01-01T" + timeString);
        let hours = dummyDate.getHours();
        const minutes = String(dummyDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("AddFoodDiary", { record: record, image: record.image })}>
                <View style={styles.medicineContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: record.image }} style={styles.profileLogo} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.medicineTextHeading}>{record.title}</Text>
                        <Text style={styles.medicineTextSide}>{formatDate(record.item_date)} as {formatTime(record.item_time)}</Text>
                        <Text style={styles.medicineTextSide}>{record.description}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: 100,
    },
    medicineWhite: {
        height: 80,
        width: 75,
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '70%',
        alignSelf: 'center'
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    capsulelogo: {
        height: 30,
        width: 30,
    },
    medicineContainer: {
        marginTop: 15,
        flexDirection: 'row',
        padding: 12,
        width: '95%',
        alignSelf: 'center',
        elevation: 3,
        backgroundColor: 'white',
    },
    textContainer: {
        padding: 5,
        marginLeft: 10,
        width: '72%',
        gap: 5,
    },
    arrowLogo: {
        height: 22,
        width: 15,
        alignSelf: 'center',
    },
    medicineTextHeading: {
        fontSize: PixelRatio.getFontScale() * 20,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
        color: config.textColorHeadings,
    },
    medicineTextSide: {
        fontSize: PixelRatio.getFontScale() * 16,
        fontFamily:config.fontStyle,
        color: config.textColorHeadings,
    },
    Profilelogo: {
        height: 36,
        width: 24,
        borderColor: config.secondaryColor,
    },
    medicineTextGrey: {
        fontSize: PixelRatio.getFontScale() * 16,
        fontFamily:config.fontStyle,
        color: config.primaryColor,
    },
    imageContainer: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:config.secondaryColor,
        borderRadius: 50,
        alignContent: 'center',
    },
    profileLogo: {
        height: 98,
        width: 98,
        borderRadius: 49.5,
    },
});

export default AppointmentContainer;
