import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import PrescriptionContainer from '../components/PrescriptionContainer';
import archive from '../assets/archive.png';
import GoldenCapsule from '../assets/goldenCapsule.png';

const Prescriptions = () => {
    const route = useRoute();
    const isHide = route?.params?.isHide ?? false;
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const isFocused = useIsFocused();
    const [showLoader , setShowLoader ] = useState(true);
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [isFocused])

    const getData = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        console.log(access_token);
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/prescriptions',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            data: data
        };
        console.log(config);
        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setPrescriptionsData(response.data);
                setShowLoader(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Prescriptions"} />
                <TouchableOpacity onPress={() => navigation.navigate("PrescriptionsArchive")} style={styles.touch}>
                    <Image source={archive} style={styles.archiveIcon} />
                </TouchableOpacity>
                {
                    prescriptionsData && prescriptionsData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                prescriptionsData.map((record, index) => (
                                    <PrescriptionContainer key={index} record={record}  isHide={isHide} getData={getData}/>
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={GoldenCapsule} style={styles.fileIcon}/>
                            <Text style={styles.emptyText}>You do not have any prescriptions data</Text>
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
        ...Platform.select({
            ios: {
                marginTop: 38,
            },
        })
    },
    emptyText: {
        color: config.primaryColor,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 16,
        width:'90%',
    },
    Empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        gap:30,
    },
    fileIcon:{
        height:90,
        width:70,
    },
});

export default Prescriptions;
