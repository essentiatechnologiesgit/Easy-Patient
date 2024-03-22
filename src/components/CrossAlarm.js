import React, { useState } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import BottomModal from './BottomModal';
const CrossAlarm = ({ time }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <View style={styles.circle}>
                        <View style={[styles.line, styles.lineDiagonal]} />
                        <View style={[styles.line, styles.lineDiagonal, styles.lineRotated]} />
                    </View>
                    <Text style={styles.text}>{time} - Alarm</Text>
                </View>
            </TouchableWithoutFeedback>
            <BottomModal visible={modalVisible} modalfor={"CrossAlarm"} onClose={() => setModalVisible(false)} />
        </>
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
