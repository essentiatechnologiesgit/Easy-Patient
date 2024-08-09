import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const DeleteAlarm = ({ AlarmId, medicineId, taken, timeUpdate, onCloseModal, reloadFunction, Medicine,handleDeleteConfirm }) => {
    const [timeBoxes, setTimeBoxes] = useState(false);


    return (
        <>
                    <Text style={styles.textHead}>{timeUpdate}-{Medicine}</Text>
                    <Text style={styles.textMed}>Do you really want to delete this reminder?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonA}
                            onPress={()=>{onCloseModal()}}
                        >
                            <Text style={styles.textA}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonA}
                            onPress={() => { handleDeleteConfirm(); onCloseModal(); }}
                        >
                            <Text style={styles.textA}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </>
            
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginTop:10,
        justifyContent: 'space-between', // You can change this as needed
    },
    textHead: {
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    textMed: {
        fontSize: 12,
        color: 'black',
        marginBottom: 2,
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

export default DeleteAlarm;
