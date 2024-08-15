import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, PixelRatio, Platform } from 'react-native';
import Modal from "react-native-modal";
import config from '../../config.mjs';
const ModalLoader = ({ msg }) => {
    const hasBackdrop = Platform.OS !== 'ios';
    return (
        <View>
            <Modal isVisible={true} 
            hasBackdrop={hasBackdrop} >
                <View style={styles.container}>
                    <ActivityIndicator  size={ 'large'}   color="grey" /> 
                    {
                        Platform.OS === 'android' && 
                        <Text style={styles.text}>Loading...</Text>
                    }
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        ...Platform.select({
            ios: {
                backgroundColor: '#EEF6F8',
                paddingVertical: 20,
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent:'center',
                width:60,
                alignSelf:'center'
            },
            android: {
                backgroundColor: 'white',
                paddingHorizontal: 30,
                paddingVertical: 20,
                flexDirection: 'row', 
                alignItems: 'center',
            },
        }),
    },
    text: {
        color:'gray',
        marginLeft: 20, 
        fontSize: PixelRatio.getFontScale() * 18,
        fontFamily:config.fontStyle,
    }
});

export default ModalLoader;
