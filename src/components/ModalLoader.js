import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, PixelRatio } from 'react-native';
import Modal from "react-native-modal";

const ModalLoader = ({ msg }) => {
    return (
        <View>
            <Modal isVisible={true}>
                <View style={styles.container}>
                    <ActivityIndicator size="larger"   color="grey" /> 
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    text: {
        color:'gray',
        marginLeft: 20, 
        fontSize: PixelRatio.getFontScale() * 18,
    }
});

export default ModalLoader;
