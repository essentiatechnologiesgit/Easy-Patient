import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import archive from '../assets/archive.png';
import BackHeader from '../components/backHeader';
import MealArchiveContainer from '../components/MealArchiveContainer';
import { touch } from 'react-native-fs';
import config from '../../config.js';
import MealGolden from '../assets/mealGolden.png';
import ModalLoader from '../components/ModalLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MealContainer from '../components/MealContainer';
const MealPlansArchive = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [mealPlansData, setMealPlansData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const isShow = route?.params?.isShow ?? false;
    const record_id = route?.params?.record_id ?? 0;
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/meal-plan/archive',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setMealPlansData(response.data);
            })
            .catch((error) => {
                console.log(error);
            }).finally(()=>{
                setShowLoader(false);
            });
    }


    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Meal Plans Archive"} />
                {
                    mealPlansData && mealPlansData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                mealPlansData.map((record, index) => (
                                    <MealContainer key={index} record={record} isArchived={true} isShow={isShow} record_id={record_id} getData={getData}/>
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={MealGolden} style={styles.fileIcon} />
                            <Text style={styles.emptyText}>You do not have any Meal Plans data</Text>
                        </View>
                }
                {showLoader && <ModalLoader />}
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
    archiveIcon: {
        height: 25,
        width: 25,
        margin: 20,
    },
    touch: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        gap: 30,
    },
    fileIcon: {
        height: 90,
        width: 90,
    },
});

export default MealPlansArchive;
