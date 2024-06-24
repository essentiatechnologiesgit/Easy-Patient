import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import archive from '../assets/archive.png';
import BackHeader from '../components/backHeader';
import GuidelinesArchiveContainer from '../components/GuidelinesArchiveContainer';
import { touch } from 'react-native-fs';
import GuidelineContainer from '../components/GuidelineContainer';
import config from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import guideleinsGold from '../assets/guidelinesGold.png';
import ModalLoader from '../components/ModalLoader';
const GuidelinesArchive = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const isFocused = useIsFocused();
    const [orientationsData, setOrientationsData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const isShow = route?.params?.isShow ?? false;
    const record_id = route?.params?.record_id ?? 0;
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
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/orientations/archive',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setOrientationsData(response.data);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setShowLoader(false);
            });
    }
    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Guidelines Archive"} />
                {
                    orientationsData && orientationsData.length > 0 ?
                        <ScrollView style={styles.scroll}>
                            {
                                orientationsData.map((record, index) => (
                                    <GuidelineContainer key={index} record={record} isArchived={true} isShow={isShow} record_id={record_id} />
                                ))
                            }
                            <View style={{ marginTop: 20, }}></View>
                        </ScrollView>
                        :
                        <View style={styles.Empty}>
                            <Image source={guideleinsGold} style={styles.fileIcon} />
                            <Text style={styles.emptyText}>You do not have any Guidelines data</Text>
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
        height: 75,
        width: 60,
    },
});

export default GuidelinesArchive;
