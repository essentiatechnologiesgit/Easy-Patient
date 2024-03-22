import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
// Did you take you Medicine
const CancelledAlarm = ({ onCloseModal }) => {
    const [timeBoxes, setTimeBoxes] = useState(false);



    const EditTime = () => {
        setTimeBoxes(true);
    }
    const handleCloseModal = () => {
        setTimeBoxes(false);
        onCloseModal(); 
      };

    return (
        <>
            {
                !timeBoxes &&
                <>
                    <Text style={styles.textHead}>Did you take your medicine</Text>
                    <Text style={styles.textMed}>Panadol</Text>
                    <Text style={styles.textMed}>2</Text>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonA}
                            onPress={EditTime}
                        >
                            <Text style={styles.textA}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                        // onPress={onPress}
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
                        <Text style={styles.font}>Pospone for how long?</Text>
                        <TouchableWithoutFeedback onPress={handleCloseModal}>
                            <Text style={styles.cross}>X</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
                            >
                                <Text style={styles.textA}>15 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
                            >
                                <Text style={styles.textA}>30 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
                            >
                                <Text style={styles.textA}>40 min</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
                            >
                                <Text style={styles.textA}>1h</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
                            >
                                <Text style={styles.textA}>1h 30</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonT}
                                onPress={EditTime}
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
    textHead:{
        marginBottom:10,
        fontSize:16,
        fontWeight:'bold',
        color:'black',
    },
    textMed:{
        marginBottom:10,
        fontSize:16,
        color:'black',
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
