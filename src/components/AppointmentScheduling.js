import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import arrow from '../assets/arrow.png';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
const AppointmentScheduling = ({date,responsible,local,query}) => {
    const navigation = useNavigation();
    const dateTime = moment(date);
    const formattedTime = dateTime.format('HH:mm');
    const formattedDate = dateTime.format('ddd, MMMM Do');
   
    return (
        <>
                <View style={styles.firstContainer}>
                    <View style={styles.head}>
                        <Text style={styles.status}>Scheduling Data</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.timeContainer}>
                        <View style={styles.list}>
                            <Text style={styles.bodyHead}>Time</Text>
                            <Text style={styles.bodyHead}>Date</Text>
                            <Text style={styles.bodyHead}>local</Text>
                            <Text style={styles.bodyHead}>Responsible</Text>
                            <Text style={styles.bodyHead}>Query Type</Text>
                        </View>
                        <View style={styles.list}>
                            <Text style={styles.bodyText}>{formattedTime}</Text>
                            <Text style={styles.bodyText}>{formattedDate}</Text>
                            <Text style={styles.bodyText}>{local}</Text>
                            <Text style={styles.bodyText}>{responsible}</Text>
                            <Text style={styles.bodyText}>{query}</Text>
                        </View>
                    </View>
                </View>
        </>
    );
};

const styles = StyleSheet.create({
    bodyText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    status: {
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        fontWeight: 'bold',
    },
    firstContainer: {
        padding: 20,
        // backgroundColor: 'grey',
    },
    head: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bodyHead: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
    },

    line: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
    timeContainer: {
        flexDirection: 'row',
        gap: 50,
    },
});

export default AppointmentScheduling;
