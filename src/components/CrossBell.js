import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, Image, View, TouchableOpacity, } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import CrossBellIcon from '../assets/crossBell.png';
import BottomModal from './BottomModal';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DeleteModal from './DeleteModal';
const CrossBell = ({ remainingTime, dosage, medicineId, time, id, Medicine, taken, reloadFunction, prescriptionText }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [deleteModal, setShowDeleteModal] = useState(false);
    const renderRightActions = (progress, dragX, swipeableRef) => (
        <TouchableOpacity onPress={(e) => handleDeletePress(e, swipeableRef)}>
            <View style={taken ? styles.deleteButtontaken : styles.deleteButton}>
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

    const handleDeleteConfirm = () => {
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
            {
                !taken &&
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={styles.container}>
                        <View style={{ position: 'absolute', width: '100%' }}>
                            <View style={styles.child}>
                                <Image source={CrossBellIcon} style={styles.bell}></Image>
                                <Text style={styles.text}>{time} - {Medicine} </Text>
                            </View>
                            <View style={styles.reminder}><Text style={styles.prescriptionText}>Take {dosage} {Medicine} in {remainingTime}m</Text></View>
                        </View>
                        <Swipeable renderRightActions={renderRightActions}>
                            <View style={styles.emptyView}>
                            </View>
                        </Swipeable>
                    </View>
                </TouchableWithoutFeedback>
            }
            {
                taken &&
                <View style={styles.containerSuccess}>
                    <View style={{ position: 'absolute', width: '100%',flexDirection:'row',padding:14 ,alignItems:'center'}}>
                        <Svg width="23" height="22" viewBox="0 0 24 24">
                            <Path fill="#50B76C" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                        </Svg>
                        <Text style={styles.text}>{time} - {Medicine} </Text>
                    </View>
                    <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.emptyView2}>
                    </View>
                    </Swipeable>
                </View>
            }
            <BottomModal visible={modalVisible} modalfor={"CrossBell"} medicineId={medicineId} AlarmId={id} reloadFunction={reloadFunction} taken={taken} onClose={() => setModalVisible(false)} Medicine={Medicine} time={time} />
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.55,
        // Android Shadow
        elevation: 2,
    },
    emptyView: {
        backgroundColor: 'transparent',
        height: 70,
        // bottom: 50,
    },
    emptyView2: {
        backgroundColor: 'transparent',
        height: 40,
        // bottom: 50,
    },
    cont: {
        flexDirection: 'row',
        marginBottom: 8,
        margin: 12,
    },
    containerSuccess: {
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        paddingVertical: 5,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.55,
        // Android Shadow
        elevation: 2,
    },
    reminder: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: '96%',
        borderRadius: 3,
        backgroundColor: '#e8e8e8',
        marginBottom: 10,
    },
    child: {
        flexDirection: 'row',
        marginBottom: 8,
        margin: 12,
    },
    text: {
        marginLeft: 8,
        color: 'black',
        fontSize:15,
    },
    prescriptionText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 13,
    },
    bell: {
        height: 20,
        width: 20,
    },
    deleteButton: {
        backgroundColor: '#AA0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 70,
        // top: -50,
    },
    deleteButtontaken: {
        backgroundColor: '#AA0000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 42,
        
    },
    image: {
        height: 20,
        width: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CrossBell;
