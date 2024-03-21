import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CrossAlarm = () => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <View style={[styles.line, styles.lineDiagonal]} />
                <View style={[styles.line, styles.lineDiagonal, styles.lineRotated]} />
            </View>
            <Text style={styles.text}>21:06 - Alarm</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 40,
        padding: 10,
        alignSelf: 'center',
    },
    text: {
        marginLeft: 8,
        color: 'black',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#B75450',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        width: '60%',
        height: 2,
        backgroundColor: 'white',
    },
    lineDiagonal: {
        transform: [{ rotate: '55deg' }],
    },
    lineRotated: {
        transform: [{ rotate: '126deg' }],
    },
});

export default CrossAlarm;
