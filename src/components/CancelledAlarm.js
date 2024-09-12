import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const CancelledAlarm = ({ AlarmId, medicineId, taken, timeUpdate, onCloseModal, reloadFunction,Medicine,dosage }) => {
    const [timeBoxes, setTimeBoxes] = useState(false);
    const { t } = useTranslation();
    const EditTime = () => {
        setTimeBoxes(true);
    }
    const handleCloseModal = () => {
        setTimeBoxes(false);
        onCloseModal();
    }
    const setTime = async ( minutesToAdd) => {
        try {
            // Retrieve the alarms array from AsyncStorage
            const alarmsArrayJSON = await AsyncStorage.getItem('Alarms');
            if (!alarmsArrayJSON) {
                throw new Error('No alarms found in AsyncStorage');
            }
    
            const alarmsArray = JSON.parse(alarmsArrayJSON);
            const today = moment().format('YYYY-MM-DD');
    
            // Map through the alarms array and update the specific medicine time object
            const updatedAlarmsArray = alarmsArray.map(alarm => {
                if (alarm.id === medicineId) {

                    const updatedTimes = alarm.times.map(timeObj => {
                        // Extract time part (HH:mm) and date part (YYYY-MM-DD) from the time object
                        const alarmDateTime = moment(timeObj.time, 'YYYY-MM-DD HH:mm');
                        const timePart = alarmDateTime.format('HH:mm');
                        const datePart = alarmDateTime.format('YYYY-MM-DD');
    
                    if (timePart === timeUpdate && datePart === today) {
                            const updatedTime = alarmDateTime.add(minutesToAdd, 'minutes');
                            return {
                                ...timeObj,
                                time: updatedTime.format('YYYY-MM-DD HH:mm')
                            };
                        }
                        return timeObj;
                    });
                    return {
                        ...alarm,
                        times: updatedTimes
                    };
                }
                return alarm;
            });
    
            // Save the updated alarms array back to AsyncStorage
            await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarmsArray));
            
            // Call the reload function to refresh the UI
            if (typeof reloadFunction === 'function') {
                reloadFunction();
            }
    
            // Call the handleCloseModal function to close the modal
            if (typeof handleCloseModal === 'function') {
                handleCloseModal();
            }
    
            console.log('Alarm updated successfully.');
        } catch (error) {
            console.error('Error updating alarm:', error);
        }
    };
    

    const setTakenTrue = async () => {
        try {
            // Retrieve the alarms array from AsyncStorage
            const alarmsArrayJSON = await AsyncStorage.getItem('Alarms');
            if (!alarmsArrayJSON) {
                throw new Error('No alarms found in AsyncStorage');
            }
    
            const alarmsArray = JSON.parse(alarmsArrayJSON);
            const today = moment().format('YYYY-MM-DD');
    
            // Map through the alarms array and update the specific medicine time object
            const updatedAlarmsArray = alarmsArray.map(alarm => {
                if (alarm.id === medicineId) {
                    const updatedTimes = alarm.times.map(timeObj => {
                        // Extract time part (HH:mm) and date part (YYYY-MM-DD) from the time object
                        const timePart = moment(timeObj.time, 'YYYY-MM-DD HH:mm').format('HH:mm');
                        const datePart = moment(timeObj.time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD');
    
                        // Check if the time part matches and it belongs to today
                        if (timePart === timeUpdate && datePart === today) {
                            return {
                                ...timeObj,
                                taken: true
                            };
                        }
                        return timeObj;
                    });
                    return {
                        ...alarm,
                        times: updatedTimes
                    };
                }
                return alarm;
            });
    
            // Save the updated alarms array back to AsyncStorage
            await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarmsArray));
            
            // Call the reload function to refresh the UI
            if (typeof reloadFunction === 'function') {
                reloadFunction();
            }
    
            // Call the handleCloseModal function to close the modal
            if (typeof handleCloseModal === 'function') {
                handleCloseModal();
            }
    
            console.log('Taken updated successfully.');
        } catch (error) {
            console.error('Error updating taken:', error);
        }
    };
    



    return (
        <>
            {
                !timeBoxes &&
                <>
                    <Text style={styles.textHead}>{t('DidMedicine')}</Text>
                    <Text style={styles.textMed}>{Medicine}</Text>
                    <Text style={styles.textMed}>{dosage}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonA}
                            onPress={EditTime}
                        >
                            <Text style={styles.textA}>{t('Snooze')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setTakenTrue()}
                        >
                            <Text style={styles.text}>{t('Yes')}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {
                timeBoxes &&
                <>
                    <View style={styles.cont}>
                        <Text style={styles.font}>Postpone for how long?</Text>
                        <TouchableWithoutFeedback onPress={handleCloseModal}>
                            <Text style={styles.cross}>X</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(15)}
                            >
                                <Text style={styles.textA}>15 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(30)}
                            >
                                <Text style={styles.textA}>30 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(40)}
                            >
                                <Text style={styles.textA}>40 min</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(60)}
                            >
                                <Text style={styles.textA}>1h</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(90)}
                            >
                                <Text style={styles.textA}>1h 30</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={() => setTime(120)}
                            >
                                <Text style={styles.textA}>2h</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            }
        </>
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
    textHead: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    textMed: {
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
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

export default CancelledAlarm;
