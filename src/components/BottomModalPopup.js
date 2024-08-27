import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, PixelRatio, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import config from '../../config.js';
import CustomButton from './CustomizedButton';

const BottomModal = ({ visible, onClose, setDuration, setFreNumber }) => {
    const [selectedDuration, setSelectedDuration] = useState('Day');
    const [durationSelect, setDurationSelect] = useState(false);
    const [frequencyNumber, setFrequencyNumber] = useState('1');
    const [heading, setHeading] = useState('Type of duration');

    const handleCloseModal = () => {
        setDurationSelect(false);
        onClose();
    };

    const durationOptions = [
        { label: 'Hour', value: 'Hour' },
        { label: 'Day', value: 'Day' },
        { label: 'Week', value: 'Week' },
    ];

    const frequencyOptions = Array.from({ length: 24 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }));

    const handleChange = () => {
        setDurationSelect(true);
        setHeading('Frequency');
    };

    const handleConfirm = () => {
        setFreNumber(frequencyNumber);
        setDuration(selectedDuration);
        setDurationSelect(false);
        setHeading('Type of duration');
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.durationText}>{heading}</Text>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <Text style={styles.closeBtn}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        !durationSelect &&
                        <>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedDuration(value)}
                                items={durationOptions}
                                placeholder={{}}
                                value={selectedDuration}
                                style={pickerSelectStyles}
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
                                <Text style={styles.freqText}>Every</Text>
                                <Text style={styles.freqText}>{frequencyNumber}</Text>


                                {/* <Text style={styles.freqText}>{frequencyNumber}</Text> */}
                                <Text style={styles.freqText}>{selectedDuration}</Text>
                                <RNPickerSelect
                                    onValueChange={(value) => setFrequencyNumber(value)}
                                    items={frequencyOptions}
                                    placeholder={{ label: 'Select an option...', value: null }}
                                    value={frequencyNumber}
                                    style={pickerSelectStyles}
                                />
                            </View>
                            <View style={styles.buttonStyle}>
                                <CustomButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={config.buttonText} text={"OK"} />
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
        fontFamily: config.fontStyle,
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
    freqText: {
        top: 20,
        textAlign: 'center',
        justifyContent: 'center',
    },
    freqContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily: config.fontStyle,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: config.secondaryColor,
        borderRadius: 4,
        color: 'black',
        paddingRight: 10,
        marginTop: 20,
        alignSelf: 'center',
        // width: '10%',
    },
    inputAndroid: {
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily: config.fontStyle,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: config.secondaryColor,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
    iconContainer: {
        display: 'none' // Hides the arrow
    }
});

export default BottomModal;
