import React, { useEffect, useRef, useState } from 'react';
import { View, Text, RefreshControl, ScrollView, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, BackHandler } from 'react-native';
import config from '../../config.js';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import FolderSlider from '../components/FolderSlider';
import BellAlarm from '../components/BellAlarm';
import CrossAlarm from '../components/CrossAlarm';
import CrossBell from '../components/CrossBell';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import ImageLogo from '../components/ImageLogo'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import Snackbar from '../components/Snackbar';
import Medications from '../components/Medications';
import { Button } from 'react-native-share';
const Dashboard = () => {
    const navigation = useNavigation();
    const [backPressed, setBackPressed] = useState(false);
    const route = useRoute();
    const [name, setName] = useState('');
    const [healthInfo, setHealthInfo] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [alarmComponents, setAlarmComponents] = useState([]);
    const [image, setImage] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const isFocused = useIsFocused();
    const [snackbarKey, setSnackbarKey] = useState(0);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
       
       setTimeout(() => {
        console.log("Yes");
          navigation.navigate('Login');
        }, 5000); 
    
      }, []);


    const content = (<>
        <View style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing}/>}
            >
                <View style={styles.headerContainer}>
                    <Image source={config.logo} style={styles.logo} />
                    {
                        image &&
                        <>
                            <ImageLogo imageURI={image} name={name} healthInfo={healthInfo} />
                        </>
                    }
                    {
                        !image &&
                        <>
                            <View style={{ position: 'absolute', right: 0 }}>
                                <CircularProgressBase
                               
                                    value={healthInfo === false ? 30 : 100}
                                    radius={26}
                                    activeStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                                    inActiveStrokeColor={healthInfo === false ? '#9e1b32' : '#379237'}
                                />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileAndHealth', { imageURI: image, name: name, healthInfo: healthInfo })} style={styles.profileButton}>
                                <Image source={profileIcon} style={styles.ProfileLogo} />
                            </TouchableOpacity>
                        </>
                    }
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameHeading}>Hello {name}!</Text>
                    <Text style={styles.nameSideHeading}>Welcome to Easy Patient.</Text>
                </View>

                <View style={styles.parentView}>
                    {/* <Text style={styles.heading}>Notifications</Text>
                    <View style={styles.NotificationContainer}>
                        <Image source={goodHealth} style={styles.healthIcon} />
                        <Text style={styles.reminder}>Dr Ahmed sent you a package of reminders</Text>
                    </View> */}
                    <View style={styles.sliderContainer}>
                        <FolderSlider />
                    </View>
                    <Text style={styles.heading}>Todays Medications</Text>
                    {
                        !alarmComponents.length > 0 &&
                        <View style={styles.component}>
                            <Medications />
                        </View>
                    }
                    {
                        alarmComponents.map((component, index) => (
                            <View style={styles.component} key={index}>
                                {component}
                            </View>
                        ))
                    }

                </View>

            </ScrollView>

            <Footer prop={0} />
            <View style={{ alignItems: 'center', bottom: 100 }}>
                {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
            </View>
        </View>
    </>);

    return (
        <>

      
            {
                (config.backgroundColorImage) ?
                    <View style={styles.container}>
                        {content}
                    </View>
                    :
                    <ImageBackground source={config.backgroundImage} style={styles.backgroundImage}>
                        {content}
                    </ImageBackground>
            }

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.backgroundColorImage,
        flex: 1,
    },
    component: {
        marginBottom: 8,
    },
    reminder: {
        // textAlign: 'center',
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily: config.fontStyle,
    },
    sliderContainer: {
        minHeight: 170,
        marginLeft: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
    },
    profileButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthIcon: {
        height: 30,
        width: 30,
    },
    NotificationContainer: {
        flexDirection: 'row',
        height: 90,
        width: '90%',
        alignSelf: 'center',
        padding: 25,
        gap: 15,
        backgroundColor: config.modalColor,
        borderRadius: 8,
        marginBottom: 20,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        marginLeft: 16,
        marginTop: -5,
    },
    nameHeading: {
        fontWeight: '500',
        fontSize: PixelRatio.getFontScale() * 24,
        color: config.textColorHeadings,
        // fontFamily:config.fontStyle,
    },
    logo: {
        width: '10%',
        resizeMode: 'contain',
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 22,
        color: config.textColorHeadings,
        marginBottom: 15,
        marginTop: -5,
        fontWeight: '600',  // semi-bold
        marginLeft: 16,
        fontFamily: config.fontStyle,
    },
    ProfileLogo: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
    },
    headerContainer: {
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginTop: 40,
            },
        }),
    },
    nameSideHeading: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.textColorHeadings,
        // fontFamily:config.fontStyle,
        // fontWeight: '500'
    },
    parentView: {
        marginTop: '6%',
    },
});

export default Dashboard;
