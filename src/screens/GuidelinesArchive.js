import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import archive from '../assets/archive.png';
import BackHeader from '../components/backHeader';
import GuidelinesArchiveContainer from '../components/GuidelinesArchiveContainer';
import { touch } from 'react-native-fs';

const GuidelinesArchive = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Guidelines Archive"} />
                <ScrollView>
                    <GuidelinesArchiveContainer />
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    archiveIcon: {
        height: 25,
        width: 25,
        margin: 20,
    },
    touch:{
        position:'absolute',
        top:0,
        right:0,
    },
});

export default GuidelinesArchive;
