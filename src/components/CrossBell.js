import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';

import CrossBellIcon from '../assets/crossBell.png';
import BottomModal from './BottomModal';
import Svg, { Path } from 'react-native-svg';
const CrossBell = ({ medicineId, time, id, Medicine, taken, reloadFunction, prescriptionText }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }

    return (
        <>
            {
                !taken &&

                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={styles.container}>
                        <View style={styles.child}>
                            <Image source={CrossBellIcon} style={styles.bell}></Image>
                            <Text style={styles.text}>{time} - Alarm </Text>
                        </View>
                        <View style={styles.reminder}><Text style={styles.text}>{prescriptionText}</Text></View>
                    </View>
                </TouchableWithoutFeedback>
            }
            {
                taken &&
                <View style={styles.containerSuccess}>
                    <Svg width="23" height="22" viewBox="0 0 24 24">
                        <Path fill="#50B76C" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                    </Svg>
                    <Text style={styles.text}>{time} - Alarm </Text>
                </View>
            }


            <BottomModal visible={modalVisible} modalfor={"CrossBell"} medicineId={medicineId} AlarmId={id} reloadFunction={reloadFunction} taken={taken} onClose={() => setModalVisible(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 80,
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
        color: 'black',
        textAlign: 'center',
    },
    reminder: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: '96%',
        borderRadius: 3,
        backgroundColor: '#e8e8e8',
    },
    child: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 8,
        color: 'black',
    },
    bell: {
        height: 20,
        width: 20,
    }
});

export default CrossBell;
