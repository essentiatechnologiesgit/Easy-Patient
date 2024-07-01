import Dialog from "react-native-dialog";
import React, { useEffect, useState } from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
const ValidationMessageError = ({ visible, msg, setVisible }) => {
    const navigation = useNavigation();
    return (
        <>
            {
                msg === "Username not registered" ?
                    <Dialog.Container visible={visible}>
                        <Dialog.Title> </Dialog.Title>
                        <Dialog.Description>
                            {msg}
                        </Dialog.Description>
                        <Dialog.Button label="Ok" onPress={() => { navigation.navigate('Signup'); setVisible(false); }} />
                        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
                    </Dialog.Container>
                    :
                    <Dialog.Container visible={visible}>
                        <Dialog.Title></Dialog.Title>
                        <Dialog.Description>
                            {msg}
                        </Dialog.Description>
                        <Dialog.Button label="Ok" onPress={() => setVisible(false)} />
                    </Dialog.Container>
            }
        </>
    );
};

const styles = StyleSheet.create({

});

export default ValidationMessageError;
