import React, { useState } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import BottomModal from './BottomModal';
import Svg, { Path } from 'react-native-svg';
const CrossAlarm = ({ medicineId, time, id, Medicine, taken, reloadFunction }) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <>
            {
                taken &&
                <View style={styles.containerSuccess}>
                    <Svg width="23" height="22" viewBox="0 0 24 24">
                        <Path fill="#50B76C" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                    </Svg>
                    <Text style={styles.text}>{time} - {Medicine} </Text>
                </View>
            }
            {
                !taken &&
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={styles.container}>
                        <View style={styles.circle}>
                            <View style={[styles.line, styles.lineDiagonal]} />
                            <View style={[styles.line, styles.lineDiagonal, styles.lineRotated]} />
                        </View>
                        <Text style={styles.text}>{time} - {Medicine}</Text>
                    </View>
                </TouchableWithoutFeedback>
            }

            <BottomModal visible={modalVisible} time={time} taken={taken} medicineId={medicineId} AlarmId={id} modalfor={"CrossAlarm"} reloadFunction={reloadFunction} onClose={() => setModalVisible(false)} />
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
    containerSuccess: {
        flexDirection: 'row',
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
