import React, { useRef } from "react";
import { View, Text, Dimensions, Image, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import config from "../../config";
import CircleButton from "./CircleButton";
const Medications = () => {
  
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.emptyText}>You don't have any medication or supplement reminders</Text>
                <CircleButton title={"AddReminder"}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    emptyText:{
        fontSize: PixelRatio.getFontScale() * 17,
        padding:6,
        color:config.primaryColor,
        textAlign:'center',
        width:'85%',
        fontFamily:config.fontStyle,
    },
    container:{
        backgroundColor:config.modalColor,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        minHeight:105,
        borderRadius:12,
        width:'92%',
    },
});

export default Medications;
