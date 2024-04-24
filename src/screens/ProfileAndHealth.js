import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import ModalLoader from '../components/ModalLoader';
import user from '../assets/user.png';
import goodHealth from '../assets/good-health.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
const ProfileAndHealth = ({ route }) => {
    const { imageURI, name, healthInfo } = route.params;
    const navigation = useNavigation();
    const props = {
        activeStrokeWidth: 12,
        inActiveStrokeWidth: 12,
        inActiveStrokeOpacity: 0.2
    };
    return (
        <>
            <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
                <BackHeader name={"Profile"} />
                <View style={styles.formContainer}>
                    <View style={{ top: -2, left: -12 }}>
                        <CircularProgressBase
                            {...props}
                            value={healthInfo === false ? 30 : 100}
                            radius={52}
                            activeStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                            inActiveStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                        />
                        <View style={styles.Percentage}>
                            <Text style={styles.percent}> {healthInfo === false ? '30%' : '100%'}</Text>
                        </View>
                    </View>
                    <View style={styles.header}>
                        {
                            healthInfo === false ?
                                <Image source={imageURI ? { uri: imageURI } : profileIcon} style={styles.Profilelogo} />
                                :
                                <Image source={imageURI ? { uri: imageURI } : profileIcon} style={styles.ProfilelogoT} />
                        }
                        <View>
                            <Text style={styles.name}>{name}</Text>
                            {
                                healthInfo === false ?
                                    <>
                                        <Text style={styles.msg}>Edit your details and complete your registration</Text>
                                        <Text style={styles.complete}>Complete profile at 30%</Text>
                                    </>
                                    :
                                    <>
                                        <Text style={styles.complete}>Profile Complete 100%</Text>
                                    </>
                            }

                        </View>
                    </View>
                </View>
                <View style={styles.ProfilesContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile") }} style={styles.bothContainers}>
                        <Image source={user} style={styles.userIcon} />
                        <View style={styles.profileParent}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.FHeading}>Basic Information</Text>
                                {/* <Text style={styles.arrow}>&gt;</Text> */}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                <View style={styles.greenCircle}></View>
                                <Text style={styles.SHeading}>Complete stage</Text>
                            </View>
                            <Text style={styles.THeading}>Edit your profile photo, name , email , date of birth and gender</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("HealthInformation") }} style={styles.bothContainers}>
                        <Image source={goodHealth} style={styles.userIcon} />
                        <View style={styles.profileParent}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.FHeading}>Health Information</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                {
                                    healthInfo === false ?
                                        <>
                                            <View style={styles.redCircle}></View>
                                            <Text style={styles.SHeading}>Incomplate stage</Text>
                                        </>
                                        :
                                        <>
                                            <View style={styles.greenCircle}></View>
                                            <Text style={styles.SHeading}>Complete Stage</Text>
                                        </>
                                }
                            </View>

                            <Text style={styles.TLHeading}>Descrbe your health status and sync your data with health apps you already use.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    ProfilesContainer: {
        gap: 20,
    },
    profileParent: {

    },
    percent: {
        fontSize: PixelRatio.getFontScale() * 12,
        color: config.textColorHeadings,
    },
    greenCircle: {
        backgroundColor: '#32de84',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    redCircle: {
        backgroundColor: '#9e1b32',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    Percentage: {
        backgroundColor: 'white',
        height: 20,
        width: 50,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#9e1b32',
        borderWidth: 1,
        marginLeft: 28,
        top: -10,
    },
    FHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    SHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
        fontWeight: 'bold',
    },
    THeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
        width: '70%',
    },
    TLHeading: {
        fontSize: PixelRatio.getFontScale() * 14,
        color: config.primaryColor,
        width: '70%',
    },
    bothContainers: {
        backgroundColor: 'white',
        height: 100,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        elevation: 8,
        flexDirection: 'row',
        padding: 10,
        gap: 15,
        overflow: 'hidden',
    },
    arrow: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        textAlign: 'right',
    },
    Profilelogo: {
        height: 72,
        width: 72,
        alignSelf: 'center',
        borderRadius: 36,
        borderColor: config.secondaryColor,
        borderWidth: 1,
    },
    ProfilelogoT: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 40,
        borderColor: config.secondaryColor,
        borderWidth: 1,
        left: -4,
        top: 5,
    },
    userIcon: {
        height: 20.6,
        width: 20,
        top: 6,
    },
    name: {
        fontSize: PixelRatio.getFontScale() * 19,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    msg: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,

    },
    complete: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        gap: 24,
        width: '80%',
        position: 'absolute',
        padding: 35,
    },
    icon: {
        marginBottom: -8,
        marginRight: 2,
    },
    focusedInput: {
        borderBottomWidth: 3,
    },
    OTPContainer: {
        marginTop: 50,
    },
    codeText: {
        fontSize: PixelRatio.getFontScale() * 17,
        textAlign: 'center',
        color: 'gray',
    },
    label: {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.primaryColor,
        zIndex: 1,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        lineHeight: PixelRatio.getFontScale() * 20,
    },
    labelFloating: {
        top: -PixelRatio.getFontScale() * 4,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    dropdownPicker: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: config.secondaryColor,
    },
    dropdownTextStyle: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 10,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'left',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalItem: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    signupContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    signupFormContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },

    FocusStyling: {
        color: config.primaryColor,
    },

    backLink: {
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.secondaryColor,
        textDecorationLine: 'underline',
        marginTop: 30,
        marginBottom: 30,
    },
    inputPassword: {
        marginTop: 10,
        height: 40,
        borderWidth: 0,
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        width: '90%',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    logo: {
        borderColor: '#fff',
        resizeMode: 'contain',
        zIndex: 999,
    },
    subLogo: {
        marginTop: 15,
    },

    signup: {
        fontWeight: 'bold',
        fontSize: PixelRatio.getFontScale() * 20,
        marginTop: '6%',
        color: config.textColorHeadings,
    },
    loginButton: {
        width: '90%',
        height: 40,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        color: config.secondaryColor,
        borderColor: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
        // backgroundColor: 'rgba(0,0,0,0)', // Set background color directly
    },
    forgotPassword: {
        justifyContent: 'flex-end',
        textDecorationLine: 'underline',
        width: '90%',
        textAlign: 'right',
        marginTop: 20,
        fontSize: PixelRatio.getFontScale() * 17
    },
    login: {
        paddingTop: '15%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 15,

    },
    checkbox: {
        marginTop: '4%',
        width: '90%',
        justifyContent: 'left',
        textAlign: 'left',
        flexDirection: 'row'
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 17,
        padding: 2,
        color: config.secondaryColor,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    textt: {
        fontSize: PixelRatio.getFontScale() * 17,
        padding: 2,
        color: 'gray',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    label: {
        position: 'absolute',
        left: 10,
        top: 10,
        fontSize: 16,
        color: config.primaryColor,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: config.primaryColor,
        borderRadius: 5,
        fontSize: 16,
    },
    floatingLabel: {
        marginBottom: 20,
        width: '90%',
        height: '100%',
        flex: 1
    },
    containerStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        borderWidth: 0,
        height: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: config.secondaryColor
    },
    customLabelStyles: {
        colorFocused: config.secondaryColor,
        colorBlurred: config.primaryColor,
        fontSizeFocused: PixelRatio.getFontScale() * 14,
        fontSizeBlurred: PixelRatio.getFontScale() * 17,
        paddingVertical: 0,
        paddingHorizontal: 0,

        marginVertical: 0
    },
    inputStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: 30,
        color: config.textColorHeadings
    }
});

export default ProfileAndHealth;
