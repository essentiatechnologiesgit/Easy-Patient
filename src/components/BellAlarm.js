import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BellIcon from '../assets/bellIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DeleteModal from './DeleteModal';
const BellAlarm = ({ time, Medicine, medicineId, reloadFunction }) => {
    const [deletePressed, setDeletePressed] = useState(false);
    const navigation = useNavigation();
    const [deleteModal, setShowDeleteModal] = useState(false);

    const handleNavigate = () => {
        if (!deletePressed) {
            navigation.navigate("UpdateReminder", { medicineId: medicineId });
        }
    };

    const handleDeletePress = (e, swipeableRef) => {
        setDeletePressed(true);
        setShowDeleteModal(true);
        // e.stopPropagation();
        swipeableRef.close();
    };

    const handleDeleteConfirm = () => {
        deleteAlarm(medicineId, time);
    }

    const handleDeletePressOut = () => {
        setDeletePressed(false);
    };

    const renderRightActions = (progress, dragX, swipeableRef) => (
        <TouchableOpacity
            onPress={(e) => handleDeletePress(e, swipeableRef)}>
            <View style={styles.deleteButton}>
                <Image
                    source={require('../assets/deleteWhite.png')}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    );

    const deleteAlarm = async (medicineId, targetTime) => {
        try {
            // Fetch existing alarms from AsyncStorage
            const existingAlarmsJSON = await AsyncStorage.getItem('Alarms');
            if (!existingAlarmsJSON) {
                console.warn('No alarms found in storage.');
                return;
            }

            const existingAlarms = JSON.parse(existingAlarmsJSON);
            console.log('Existing alarms:', existingAlarms);

            // Get today's date in the format 'YYYY-MM-DD'
            const todayDate = moment().format('YYYY-MM-DD');

            // Combine today's date with the target time
            const targetDateTime = `${todayDate} ${targetTime}`;

            // Find the alarm object with the specified medicineId
            const updatedAlarms = existingAlarms.map(alarm => {
                if (alarm.id === medicineId) {
                    // Filter out the specific time instance
                    const updatedTimes = alarm.times.filter(timeObj => {
                        const alarmTime = moment(timeObj.time);
                        const isSameTime = alarmTime.isSame(moment(targetDateTime));
                        console.log(`Checking time - ID: ${timeObj.id}, Time: ${timeObj.time}, Matches: ${isSameTime}`);

                        return !isSameTime;
                    });
                    return { ...alarm, times: updatedTimes };
                }
                return alarm;
            });


            await AsyncStorage.setItem('Alarms', JSON.stringify(updatedAlarms));
            reloadFunction();
        } catch (error) {
            console.error('Error deleting alarm:', error);
        }
    };
    return (
        <>
            <TouchableWithoutFeedback onPress={handleNavigate}>
                <View style={styles.container}>
                    <View style={{ position: 'absolute', width: '100%' }}>
                        <View style={styles.child}>
                            <Image source={BellIcon} style={styles.bell} />
                            <Text style={styles.text}>{time} - {Medicine}</Text>
                        </View>
                    </View>
                    <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.emptyView}>
                    </View>
                    </Swipeable>
                </View>
            </TouchableWithoutFeedback>
            <DeleteModal visible={deleteModal} modalfor={"CrossBell"} medicineId={medicineId} reloadFunction={reloadFunction} onClose={() => setShowDeleteModal(false)} Medicine={Medicine} time={time} handleDeleteConfirm={handleDeleteConfirm} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        paddingVertical: 1,
        alignSelf: 'center',
    },
    emptyView: {
        backgroundColor: 'transparent',
        height: 35,
        // bottom: 50,
    },
    text: {
        marginLeft: 8,
        color: 'black',
        fontSize:15,
    },
    bell: {
        height: 20,
        width: 20,
    },
    image: {
        height: 20,
        width: 20,
    },
    deleteButton: {
        backgroundColor: '#AA0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        padding: 8,
    },
    child: {
        flexDirection: 'row',
        padding: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BellAlarm;
