import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SnoozeNotify = ({ AlarmId, medicineId, taken, timeUpdate, onCloseModal, reloadFunction  }) => {
    const [timeBoxes, setTimeBoxes] = useState(false);
    
    // useEffect(() => {
    //     setTimeBoxes(false);
    // }, [onClose])

    const EditTime = () => {
        setTimeBoxes(true);
    }
    const handleCloseModal = () => {
        setTimeBoxes(false);
        onCloseModal();
    };

    const setTime = async (minutesToAdd) => {
        try {
            const alarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
            const updatedAlarmsArray = alarmsArray.map(alarm => {
                if (alarm.id === medicineId) {
                    
                    const updatedMedicine = alarm.times.map(timeObj => {
                        console.log(timeObj.id,AlarmId);
                        if (timeObj.id === AlarmId) {
                            
                            const [hours, minutes] = timeObj.time.split(':').map(Number);
                            const totalMinutes = hours * 60 + minutes;
                            const updatedTotalMinutes = totalMinutes + minutesToAdd;
                            const updatedHours = Math.floor(updatedTotalMinutes / 60);
                            const updatedMinutes = updatedTotalMinutes % 60;
                            return {
                                ...timeObj,
                                time: `${updatedHours.toString().padStart(2, '0')}:${updatedMinutes.toString().padStart(2, '0')}`
                            };
                        } else {
                            return timeObj;
                        }
                    });
                    return {
                        ...alarm,
                        times: updatedMedicine
                    };
                } else {
                    return alarm;
                }
            });

            // console.log(JSON.stringify(updatedAlarmsArray, null, 2));
            await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarmsArray));
            reloadFunction();
            handleCloseModal()
            // console.log('Alarm updated successfully.');
        } catch (error) {
            console.error('Error updating alarm:', error);
        }
    }


    const setTakenTrue = async () => {
        try {
            const alarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
            const updatedAlarmsArray = alarmsArray.map(alarm => {
                if (alarm.id === medicineId) {
                    const updatedMedicine = alarm.times.map(timeObj => {
                        if (timeObj.id === AlarmId) {
                            return {
                                ...timeObj,
                                taken: true 
                            };
                        } else {
                            return timeObj;
                        }
                    });
                    return {
                        ...alarm,
                        times: updatedMedicine
                    };
                } else {
                    return alarm;
                }
            });
            // console.log(JSON.stringify(updatedAlarmsArray, null, 2));
           
            await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarmsArray));
            reloadFunction();
            handleCloseModal()
            console.log('Taken updated successfully.');
        } catch (error) {
            console.error('Error updating taken:', error);
        }
    }


    return (
        <>
            {
                !timeBoxes &&
                <>
                    <Text style={styles.textHead}>7:00 Omerprazole</Text>
                    <Text style={styles.textMed}>You didnt take your medicine</Text>
                    <Text style={[styles.textMed, { marginBottom: 20 }]}>Mark as taken?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonA}
                            onPress={EditTime}
                        >
                            <Text style={styles.textA}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                        onPress={()=>setTakenTrue()}
                        >
                            <Text style={styles.text}>Yes</Text>
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
    textHead: {
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    textMed: {
        fontSize: 12,
        color: 'black',
        marginBottom:2,
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

export default SnoozeNotify;
