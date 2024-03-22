import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
import SnoozeNotify from './SnoozeNotify';
import CancelledAlarm from './CancelledAlarm';
// Did you take you Medicine
const BottomModal = ({ visible, onClose, modalfor }) => {
    const [timeBoxes, setTimeBoxes] = useState(false);

    useEffect(() => {
        setTimeBoxes(false);
    }, [onClose])

    const EditTime = () => {
        setTimeBoxes(true);
    }
    const handleCloseModal = () => {
        onClose();
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onPress={onClose}
                />
                <View style={{ backgroundColor: '#edf1f7', padding: 20 }}>
                    {
                        modalfor === "CrossAlarm" ?
                            <CancelledAlarm onCloseModal={handleCloseModal} />
                            :
                            <SnoozeNotify onCloseModal={handleCloseModal} />
                    }
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // You can change this as needed
    },
    cont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    container: {
        gap: 10,
    },
    buttonA: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        borderWidth: 1,
        width: '43%', // Adjust as needed
        borderRadius: 30,
        backgroundColor: config.white,
        borderColor: config.secondaryColor,
    },
    buttonT: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderWidth: 1,
        width: '30%', // Adjust as needed
        borderRadius: 30,
        backgroundColor: config.white,
        borderColor: config.secondaryColor,
    },
    font: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
    textA: {
        fontSize: 16,
        fontWeight: 'bold',
        color: config.secondaryColor,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        borderWidth: 1,
        width: '43%', // Adjust as needed
        elevation: 3,
        borderRadius: 30,
        backgroundColor: config.secondaryColor,
        borderColor: config.secondaryColor,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    cross: {
        fontSize: 20,
        color: 'black',
    },
})

export default BottomModal;
