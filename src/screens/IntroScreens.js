import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text, PixelRatio, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PermissionsAndroid, Platform } from 'react-native';
import Dots from 'react-native-dots-pagination';
import config from '../../config.js';
import HealthIntroScreen from '../components/HealthIntroScreen';
import CustomButton from '../components/CustomizedButton';
import CustomizedAppIntro from '../components/CustomizedAppIntro';
import BellIntro from '../components/BellIntro';
import MapsAccess from '../components/MapsAccess';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const IntroScreens = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);  // Create a reference to the ScrollView
    const [locationPermission, setLocationPermission] = useState(false);
    const { t } = useTranslation();

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const page = Math.round(contentOffset.x / layoutMeasurement.width);
        setCurrentPage(page);
    };

    const handleAdvance = () => {
        if (currentPage < 3) {
            scrollViewRef.current.scrollTo({ x: (currentPage + 1) * Dimensions.get('window').width, animated: true });
        } else {
            requestLocationPermission();
        }
    };

    const requestLocationPermission = async () => {
        await Asklocation();
        await AskCamera();
        await AskGallery();

       navigation.navigate("Login");
    };


    const AskCamera = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "This app needs access to your camera to take photos.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission granted (Android)");
                } else {
                    console.log("Camera permission denied (Android)");
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (Platform.OS === 'ios') {
            const permission = await request(PERMISSIONS.IOS.CAMERA);
            if (permission === RESULTS.GRANTED) {
                console.log("Camera permission granted (iOS)");
                setLocationPermission(true);
            } else {
                console.log("Camera permission denied (iOS)");
            }
        }
    }

    const AskGallery = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: "Photos Permission",
                        message: "This app needs access to your photos and media.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Photos permission granted (Android)");
                } else {
                    console.log("Photos permission denied (Android)");
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (Platform.OS === 'ios') {
            const permission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (permission === RESULTS.GRANTED) {
                console.log("Gallery permission granted (iOS)");
                setLocationPermission(true);
            } else {
                console.log("Gallery permission denied (iOS)");
            }
        }
    };
    

    const Asklocation = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app needs access to your location so you can see your location on the map.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Location permission granted (Android)");
                    setLocationPermission(true);
                } else {
                    console.log("Location permission denied (Android)");
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (Platform.OS === 'ios') {
            const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (permission === RESULTS.GRANTED) {
                console.log("Location permission granted (iOS)");
                setLocationPermission(true);
            } else {
                console.log("Location permission denied (iOS)");
            }
        }
    }

    return (
        <View style={styles.parentContainer}>
            <ScrollView
                ref={scrollViewRef}  // Attach the reference to the ScrollView
                style={{ maxHeight: 650 }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={{ width: Dimensions.get('window').width }}>
                    <HealthIntroScreen />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <CustomizedAppIntro />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <BellIntro />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <MapsAccess />
                </View>
            </ScrollView>
            <View style={{ width: '40%', alignSelf: 'center' }}>
                <CustomButton
                    onPress={handleAdvance}  // Update the onPress handler
                    buttonColor={config.secondaryColor}
                    borderColor={config.secondaryColor}
                    textColor={"white"}
                    text={currentPage !== 3 ? t('Advance') : t('Agree')}
                />
            </View>
            <View style={styles.dots}>
                {
                    currentPage !== 3 ?
                        <Dots
                            length={4}
                            active={currentPage}
                            activeColor={config.secondaryColor}
                            marginHorizontal={4}
                        />
                        :
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.missTrade}>{t('Misstrade')}</Text>
                        </TouchableWithoutFeedback>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    dots: {
        marginTop: 50,
    },
    missTrade: {
        alignSelf: 'center',
        color: config.secondaryColor,
        textDecorationLine: 'underline',
        fontSize: PixelRatio.getFontScale() * 16,
    },
});

export default IntroScreens;
