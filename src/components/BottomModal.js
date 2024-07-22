import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
import SnoozeNotify from './SnoozeNotify';
import CancelledAlarm from './CancelledAlarm';
// Did you take you Medicine
const BottomModal = ({ visible,medicineId, AlarmId, time,taken, onClose, modalfor, reloadFunction, Medicine }) => {
    const handleCloseModal = () => {
        onClose();
    };

    return (
        <Modal     
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                    onPress={onClose}
                />
                <View style={{ backgroundColor: '#edf1f7', padding: 15, height:200   }}>
                    {
                        modalfor === "CrossAlarm" ?
                            <CancelledAlarm AlarmId={AlarmId} taken={taken} medicineId={medicineId}  timeUpdate={time} onCloseModal={handleCloseModal} reloadFunction={reloadFunction} Medicine={Medicine}/>
                            :
                            <SnoozeNotify  AlarmId={AlarmId} taken={taken} medicineId={medicineId}  timeUpdate={time} onCloseModal={handleCloseModal} reloadFunction={reloadFunction}  Medicine={Medicine}/>
                    }
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        // You can change this as needed
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
