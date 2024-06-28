import React, { useState } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import BottomModal from './BottomModal';
import { Swipeable } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DeleteModal from './DeleteModal';
const CrossAlarm = ({ medicineId, time, id, Medicine, taken, reloadFunction }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal , setShowDeleteModal] = useState(false);
   
    const renderRightActions = (progress, dragX, swipeableRef) => (
        <TouchableOpacity onPress={(e) => handleDeletePress(e, swipeableRef)}>
            <View style={styles.deleteButton}>
            <Image
                source={require('../assets/deleteWhite.png')}
                style={styles.image}
            />
            </View>
        </TouchableOpacity>
    );

    const handleDeletePress = (e, swipeableRef) => {
        setShowDeleteModal(true)
        e.stopPropagation();
        swipeableRef.close();
    };

    const handleDeleteConfirm = () =>{
        deleteAlarm(medicineId, time);
    }

    const deleteAlarm = async (medicineId, targetTime) => {
        try {
            const existingAlarmsJSON = await AsyncStorage.getItem('Alarms');
            if (!existingAlarmsJSON) {
                console.warn('No alarms found in storage.');
                return;
            }

            const existingAlarms = JSON.parse(existingAlarmsJSON);
            console.log('Existing alarms:', existingAlarms);

            const todayDate = moment().format('YYYY-MM-DD');
            const targetDateTime = `${todayDate} ${targetTime}`;

            const updatedAlarms = existingAlarms.map(alarm => {
                if (alarm.id === medicineId) {
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
            {taken ? (
                <View style={styles.container}>
                    <Swipeable renderRightActions={renderRightActions}>
                        <View style={styles.cont}>
                        <Svg width="23" height="22" viewBox="0 0 24 24">
                            <Path fill="#50B76C" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                        </Svg>
                        <Text style={styles.text}>{time} - {Medicine} </Text>
                        </View>
                    </Swipeable>
                </View>
            ) : (
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={styles.container}>
                        <Swipeable renderRightActions={renderRightActions}>
                            <View style={styles.cont}>
                                <View style={styles.circle}>
                                    <View style={[styles.line, styles.lineDiagonal]} />
                                    <View style={[styles.line, styles.lineDiagonal, styles.lineRotated]} />
                                </View>
                                <Text style={styles.text}>{time} - {Medicine}</Text>
                            </View>
                        </Swipeable>
                    </View>
                </TouchableWithoutFeedback>
            )}

            <BottomModal
                visible={modalVisible}
                time={time}
                taken={taken}
                medicineId={medicineId}
                AlarmId={id}
                modalfor={"CrossAlarm"}
                reloadFunction={reloadFunction}
                onClose={() => setModalVisible(false)}
            />
               <DeleteModal visible={deleteModal} modalfor={"CrossBell"} medicineId={medicineId} AlarmId={id} reloadFunction={reloadFunction} taken={taken} onClose={() => setShowDeleteModal(false)} Medicine={Medicine} time={time} handleDeleteConfirm={handleDeleteConfirm} />
      
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
    cont:{
        flexDirection:'row',
        padding:8,
    },
    containerSuccess: {
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        padding:10,
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
    deleteButton: {
        backgroundColor: '#AA0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        padding: 9,
    },
    image:{
        height:20,
        width:20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CrossAlarm;
