import React, { useRef } from "react";
import { View, Text, Dimensions, Image, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import config from "../../config";
import CircleButton from "./CircleButton";
const Medications = () => {
  
    return (
        <>
            <Text style={styles.heading}>Todays Medications</Text>
            <View style={styles.container}>
                <Text style={styles.emptyText}>You don't have any medication or supplement reminders</Text>
                <CircleButton />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    emptyText:{
        fontSize: PixelRatio.getFontScale() * 18,
        padding:6,
        textAlign:'center',
    },
    container:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        minHeight:120,
        borderRadius:12,
        marginLeft:6,
        marginRight:18,
    },
});

export default Medications;
