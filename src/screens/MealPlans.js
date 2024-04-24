import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import archive from '../assets/archive.png';
import BackHeader from '../components/backHeader';
import MealContainer from '../components/MealContainer';
import { touch } from 'react-native-fs';

const MealPlans = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Diet Plans"} />
                <TouchableOpacity onPress={()=>navigation.navigate("MealPlansArchive")} style={styles.touch}>
                    <Image source={archive} style={styles.archiveIcon} />
                </TouchableOpacity>
                <ScrollView>
                    <MealContainer />
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

export default MealPlans;
