import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import CircleButton from '../components/CircleButton';
import FoodDiaryContainer from '../components/FoodDiaryContainer';
const FoodDiary = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [foodRecord, setFoodRecord] = useState();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getCredentials()
            getRecord();
        }
    }, [isFocused])

    const getCredentials = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        getRecord(access_token);
    }

    const getRecord = (access_token) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/patient/food-diary',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        axios.request(config)
            .then((response) => {
                setFoodRecord(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Food Diary"} />
                <TouchableOpacity onPress={() => navigation.navigate("FoodDiary")} style={styles.touch}>
                    <CircleButton title={"AddFoodDiary"} />
                </TouchableOpacity>
                {
                    foodRecord && foodRecord.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                foodRecord.map((record, index) => (
                                    <FoodDiaryContainer key={index} record={record} />
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Text style={styles.emptyText}>You do not have any Food Diary</Text>
                            <CircleButton />
                        </View>
                }

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColor,
        flex: 1,
        // justifyContent:'center',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '70%',
        alignSelf: 'center'
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    archiveIcon: {
        height: 25,
        width: 25,
        margin: 20,
    },
    touch: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
});

export default FoodDiary;
