import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, PixelRatio, StyleSheet } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import config from '../../config';
import CustomButton from './CustomizedButton';
import {
    WheelPicker,
} from "react-native-wheel-picker-android";
const BottomModal = ({ visible, onClose, setDuration, setFreNumber }) => {
    const [selectedDuration, setSelectedDuration] = useState('Day');
    const [durationSelect, setDurationSelect] = useState(false);
    const [frequencyNumber, setFrequencyNumber] = useState('1');
    const [heading, setHeading] = useState('Type of duration');

    const handleCloseModal = () => {
        setDurationSelect(false);
        onClose();
    };


    const [selectedItem, setSelectedItem] = useState(0);
    
    const handleItemSelected = (index) => {
        switch (index) {
            case 0:
                setSelectedDuration("Hour");
                break;
            case 1:
                setSelectedDuration("Day");
                break;
            case 2:
                setSelectedDuration("Week");
                break;
            default:
                setSelectedDuration("Day");
        }
    };


    const handleChange = () => {
        setDurationSelect(true);
        setHeading('Frequency');
    };

    const handleConfirm = () => {
        setFreNumber(frequencyNumber+1);
        setDuration(selectedDuration);
        setDurationSelect(false);
        setHeading('Type of duration');
        onClose();
    }


    const handleFrequencyChange = (index) => {
        setFrequencyNumber(index);
        console.log(frequencyNumber);
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.durationText}>{heading}</Text>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <Text style={styles.closeBtn}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        !durationSelect &&
                        <>
                            <WheelPicker
                                style={styles.picker}
                                selectedItem={selectedItem}
                                data={["Hour","Day","Week"]}
                                onItemSelected={handleItemSelected}
                                selectedItemTextSize={28}
                                itemTextColor={config.primaryColor}
                                indicatorColor={config.secondaryColor}
                                selectedItemTextColor={config.secondaryColor}
                                indicatorWidth={2}
                            />
                            <View style={styles.buttonStyle}>
                                <CustomButton onPress={handleChange} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"OK"} />
                            </View>
                        </>

                    }
                    {
                        durationSelect &&
                        <>
                            <View style={styles.freqContainer}>
                            <View style={styles.freqContainer}>
                            <Text style={styles.freqText}>Every</Text>
                            
                                <WheelPicker
                                    style={styles.picker}
                                    selectedItem={selectedItem}
                                    data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]}
                                    onItemSelected={handleFrequencyChange}
                                    selectedItemTextSize={28}
                                    itemTextColor={config.primaryColor}
                                    indicatorColor={config.secondaryColor}
                                    selectedItemTextColor={config.secondaryColor}
                                    indicatorWidth={2}
                                />
                                <Text style={styles.freqText}>{selectedDuration}</Text>
                            </View>
                            </View>
                            <View style={styles.buttonStyle}>
                                {/* <CustomButton  buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"OK"} /> */}
                                <CustomButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"OK"} />

                            </View>
                        </>
                    }

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    durationText: {
        color: config.textColorHeadings,
        marginLeft: 20,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    buttonStyle: {
        backgroundColor: '#edf1f7',
        marginBottom: 20,
        alignSelf: 'center',
        width: '30%',
        height: 38,
        marginTop: 20,
    },
    closeBtn: {
        fontSize: 16,
        top: -6,
        color: 'black',
    },
    freqText:{
        top:20,
        textAlign:'center',
        justifyContent:'center',
    },
    freqContainer:{
        flexDirection:'row',
        justifyContent:'center',
        gap:20,
    
        alignItems:'center',
    },

    picker: {

        height: 160,
        width: '50%',
        alignSelf: 'center',
    },
});

export default BottomModal;
