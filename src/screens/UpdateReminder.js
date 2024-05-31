import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, Switch, Alert, Image, PixelRatio, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomizedButton from '../components/CustomizedButton';
import deleteIcon from '../assets/delete.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import ValidationError from '../components/ValidationError';
import moment from "moment";
import axios from 'axios';
import redDrop from '../assets/redDrop.png';
import blackDrop from '../assets/blackDrop.png';
import blueDrop from '../assets/blueDrop.png';
import { readFile } from 'react-native-fs';
import blueCapsule from '../assets/blueCapsule.png';
import redCapsule from '../assets/redCapsule.png';
import yellowDrink from '../assets/yellowDrink.png';
import blackCapsule from '../assets/blackCapsule.png';
import yellowDrop from '../assets/yellowDrop.png';
import redDrink from '../assets/redDrink.png';
import blueDrink from '../assets/blueDrink.png';
import blackDrink from '../assets/blackDrink.png';
import yellowMed from '../assets/yellowMed.png';
import blueMed from '../assets/blueMed.png';
import redMed from '../assets/redMed.png';
import blackMed from '../assets/blackMed.png';
import yellowCapsule from '../assets/yellowCapsule.png';
import BottomModalPopup from '../components/BottomModalPopup';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import medicine from '../assets/medicine.png';
import MedicineImage from './MedicineImage';
const UpdateReminder = ({ route }) => {
    // const routeInfo = useRoute();
    // const medicineId = routeInfo.params.medicineId;

    const { selectedImage, image, medicineId } = route.params || { selectedImage: 1 };
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [medId, setMedId] = useState(medicineId);
    const [placeholderLabelAnim] = useState(new Animated.Value(selectedDays ? 1 : 0));
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [MedicineName, setMedicineName] = useState('');
    const [days, setDays] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dose, setDose] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState('');
    const errorRefs = useRef([]);
    //validation feilds
    const [medicineError, setMedicineError] = useState(false);
    const [doseError, setDoseError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [fetchDateFormat, setFetchedDateFormat] = useState('');
    const [daysError, setDaysError] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    const [priority, setPriority] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [freNumber, setFreNumber] = useState('');
    const [duration, setDuration] = useState('');
    const [MedicineId, setMedicineId] = useState('');
    const [freNumberError, setFreNumberError] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [MedImage, setMedImage] = useState('');
    const [default_icon, setDefaultIcon] = useState('');
    const [newIcon, setNewIcon] = useState(false);

    const toggleNotifySwitch = () => {
        setIsNotify(previousState => !previousState);
    };
    const togglePrioritySwitch = () => {
        setPriority(previousState => !previousState);
    };
    const handlePressDatePicker = () => {
        setShowDatePicker(true);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setShowTimePicker(true);
    };
    const handleSelect = (item) => {
        setSelectedDays(item.value);
        setIsOpen(false);
        setPlaceholderVisible(false);
        Animated.timing(placeholderLabelAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    const DaysArray = [
        { label: 'Days', value: '1' },
        { label: 'Weeks', value: '2' },
        { label: 'Months', value: '3' },
    ];
    const handleOpen = () => setIsOpen(!isOpen);

    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        const currentTime = selectedTime || time;
        setTime(currentTime);
    };

    useEffect(() => {
        getMedicineDetails();
    }, [])

    const getMedicineDetails = async (imageUpdate) => {

        setMedicineId(medicineId);
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        setAccessToken(access_token);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/medicines',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        axios.request(config)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id === medId) {
                        if (imageUpdate == "true") {
                            updateMedicineById(response.data[i].picture_link);
                        }
                        // console.log(response.data[i]);
                        setMedicineName(response.data[i].name);
                        setDose(response.data[i].dosage);
                        const days = response.data[i].number_of_days;
                        setDays(days.toString());

                        const fetchedDate = new Date(response.data[i].start_time);
                        const monthNames = [
                            "January", "February", "March", "April", "May", "June", "July",
                            "August", "September", "October", "November", "December"
                        ];

                        const year = fetchedDate.getFullYear();
                        const monthIndex = fetchedDate.getMonth();
                        const monthName = monthNames[monthIndex];
                        const day = fetchedDate.getDate();
                        const hours = fetchedDate.getHours();
                        const minutes = fetchedDate.getMinutes();
                        const formattedDate = `${day} ${monthName} ${year} as ${hours}h ${minutes}min`;
                        setFetchedDateFormat(formattedDate);
                        setFreNumber(response.data[i].frequency);
                        setMedImage(response.data[i].picture_link);
                        setDefaultIcon(response.data[i].default_icon);
                        // console.log(response.data[i]);
                        setDuration("hour");
                        if (response.data[i].st_notification == '1') {
                            setIsNotify(true);
                        }
                        if (response.data[i].st_critical == '1') {
                            setPriority(true);
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getFileExtension = (fileUri) => {
        if (!fileUri) {
            return null;
        }
        const parts = fileUri.split('.');
        return parts.length > 1 ? parts.pop() : null;
    }

    const handleDelete = () => {

        Alert.alert(
            'Alert',
            `Do you want to delete ${MedicineName}?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Deletion cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Ok',
                    onPress: () => deleteItem(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    }

    const deleteItem = () => {
        setShowLoader(true);
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://api-patient-dev.easy-health.app/medicines/${medicineId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        axios.request(config)
            .then((response) => {
                removeMedicineById(medicineId);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setShowLoader(false);
                navigation.navigate('Reminders', {
                    isChanged: true,
                });
            });
    }

    const removeMedicineById = async (medicineId) => {
        try {
            const existingAlarmsJSON = await AsyncStorage.getItem('Alarms');
            let existingAlarms = existingAlarmsJSON ? JSON.parse(existingAlarmsJSON) : [];

            existingAlarms = existingAlarms.filter(alarm => alarm.id !== medicineId);

            await AsyncStorage.setItem('Alarms', JSON.stringify(existingAlarms));

        } catch (error) {
            console.error('Error removing medicine:', error);
        }
    };

    let formattedDate = '';
    if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthAbbreviation = monthNames[parseInt(month) - 1];
        formattedDate = `${day} ${monthAbbreviation}.${year} as ${hours}h ${minutes}min`;
    }

    const handleConfirm = async () => {
        // console.warn(medicineId);
        // console.log("SelectedImage",typeof(selectedImage));
        setMedicineError(false);
        setErrorMessage('');
        setDateError(false);
        setDaysError(false);
        setDoseError(false);
        if (!MedicineName) {
            setMedicineError(true);
            setErrorMessage('Enter the name of Medicine/Supplement');
        }
        else if (!dose) {
            setDoseError(true);
            setErrorMessage('Enter dosage');
        }
        else if (!date && !fetchDateFormat) {
            setDateError(true);
            setErrorMessage('Enter start date and time');
        }
        else if (!days) {
            setDaysError(true);
            setErrorMessage('Enter number of days')
        } else if (!freNumber) {
            setFreNumberError(true);
            setErrorMessage('Please enter the frequency');
        } else {
            setShowLoader(true);
            const loginResponse = await AsyncStorage.getItem('loginResponse');
            const responseObject = JSON.parse(loginResponse);
            const access_token = responseObject.access_token;

            // if (image)
            //     console.warn("image")
            // else {
            //     if (selectedImage) {
            //         console.warn("selected Image", selectedImage)
            //     } else {
            //         console.warn("No image Case");
            //     }
            // }


            let IMG = false;
            if (image) {
                IMG = true;
                try {
                    let data = new FormData();
                    const fileExtension = getFileExtension(image) || 'jpg'; // Default extension 'jpg'
                    const fileName = `image.${fileExtension}`;

                    data.append('file', {
                        uri: image,
                        name: fileName,
                        type: `image/${fileExtension}`,
                    });

                    const config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        url: `https://api-patient-dev.easy-health.app/medicines/${medId}`,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${access_token}`,
                        },
                        data: data
                    };

                    const response = await axios.request(config);
                } catch (error) {
                    console.log("", error);
                } finally {
                    // setShowLoader(false);
                    // navigation.navigate('Dashboard', {
                    //     isChanged: true,
                    // });
                }
            }
            updateData(access_token, IMG);
        }
    }

    const updateData = async (access_token, IMG) => {
        // console.log(selectedImage);
        let data = new FormData();

        if (date) {
            const Newdate = `${date?.getFullYear()}-${String(date?.getMonth() + 1).padStart(2, '0')}-${String(date?.getDate()).padStart(2, '0')}`;
            const Newtime = `${String(time?.getHours()).padStart(2, '0')}:${String(time?.getMinutes()).padStart(2, '0')}:${String(time?.getSeconds()).padStart(2, '0')}`;
            data.append('start_time', `${Newdate} ${Newtime}`);
        }

        data.append('days_of_the_week', '4,7,5');
        data.append('st_notification', !isNotify ? 0 : 1);
        data.append('st_critical', !priority ? 0 : 1);
        data.append('name', MedicineName);
        data.append('dosage', dose);
        data.append('number_of_days', days);
        data.append('frequency', freNumber);
        if (!IMG)
            data.append('default_icon', selectedImage ? selectedImage : default_icon);


        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://api-patient-dev.easy-health.app/medicines/${medId}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access_token}`,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            }).finally(async () => {
                if (IMG) {
                    await getMedicineDetails("true");
                } else {

                    if (selectedImage) {
                        updateMedicineById();
                    } else {
                        updateMedicineById(MedImage);
                    }
                }


            });
    }

    const updateMedicineById = async (imageUpdate) => {
        let durationInt;
        if (duration === "Hour") {
            durationInt = 0;
        } else if (duration === "Day") {
            durationInt = 1;
        } else {
            durationInt = 2;
        }
        try {
            // Fetch existing alarms from AsyncStorage
            const existingAlarmsJSON = await AsyncStorage.getItem('Alarms');
            let existingAlarms = existingAlarmsJSON ? JSON.parse(existingAlarmsJSON) : [];

            // Iterate through each alarm
            existingAlarms = existingAlarms.map(alarm => {
                // If the alarm matches the provided medicineId, update it
                if (alarm.id === medId) {
                    let timeId = 1;
                    const updatedTimes = [];
                    const startTimeMoment = moment(time);
                    const daysArray = [];

                    if (date) {
                        let Newdate = `${date?.getFullYear()}-${String(date?.getMonth() + 1).padStart(2, '0')}-${String(date?.getDate()).padStart(2, '0')}`;
                        let Newtime = `${String(time?.getHours()).padStart(2, '0')}:${String(time?.getMinutes()).padStart(2, '0')}:${String(time?.getSeconds()).padStart(2, '0')}`;
                        const nextAlarmTime = moment(`${Newdate} ${Newtime}`);

                        // Update times based on the new start time
                        if (durationInt === 0) { // Hourly
                            while (nextAlarmTime.isBefore(moment().endOf('day'))) {
                                updatedTimes.push({
                                    time: nextAlarmTime.format('YYYY-MM-DD HH:mm'),
                                    id: timeId,
                                    taken: false
                                });
                                nextAlarmTime.add(freNumber, 'hours');
                                timeId++;
                            }
                        } else if (durationInt === 1) { // Daily
                            for (let day = 0; day < days; day++) {
                                updatedTimes.push({
                                    time: nextAlarmTime.clone().add(day, 'days').format('YYYY-MM-DD HH:mm'),
                                    id: timeId,
                                    taken: false
                                });
                                daysArray.push(nextAlarmTime.clone().add(day, 'days').format('YYYY-MM-DD'));
                                timeId++;
                            }
                        } else { // Monthly
                            for (let month = 0; month < days / 30; month++) {
                                updatedTimes.push({
                                    time: nextAlarmTime.clone().add(month, 'months').format('YYYY-MM-DD HH:mm'),
                                    id: timeId,
                                    taken: false
                                });
                                daysArray.push(nextAlarmTime.clone().add(month, 'months').format('YYYY-MM-DD'));
                                timeId++;
                            }
                        }

                        const updatedAlarm = {
                            ...alarm,
                            medicine: MedicineName,
                            dosage: dose,
                            start_time: `${Newdate} ${Newtime}`,
                            number_of_days: days,
                            frequency: freNumber,
                            duration: durationInt,
                            st_notification: isNotify ? 1 : 0,
                            st_critical: priority ? 1 : 0,
                            selectedImage: selectedImage ? selectedImage : default_icon,
                            times: updatedTimes,
                            days: daysArray,
                            picture_link: imageUpdate ? imageUpdate : null,
                        };

                        return updatedAlarm;
                    } else {
                        const updatedAlarm = {
                            ...alarm,
                            medicine: MedicineName,
                            dosage: dose,
                            number_of_days: days,
                            duration: durationInt,
                            frequency: freNumber,
                            st_notification: isNotify ? 1 : 0,
                            st_critical: priority ? 1 : 0,
                            selectedImage: selectedImage ? selectedImage : default_icon,
                            picture_link: imageUpdate ? imageUpdate : null
                        };

                        return updatedAlarm;
                    }
                }
                return alarm;
            });

            // Store updated alarms in AsyncStorage
            await AsyncStorage.setItem('Alarms', JSON.stringify(existingAlarms));
            setShowLoader(false);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating medicine by id:', error);
        }
    };


    const renderImage = () => {
        switch (selectedImage ? selectedImage : default_icon) {
            case 1:
                return <Image source={blackMed} style={styles.Profilelogo} />;
            case 2:
                return <Image source={blackCapsule} style={styles.capsulelogo} />;
            case 3:
                return <Image source={blackDrop} style={styles.Profilelogo} />;
            case 4:
                return <Image source={blackDrink} style={styles.Profilelogo} />;
            case 5:
                return <Image source={blueMed} style={styles.Profilelogo} />;
            case 6:
                return <Image source={blueCapsule} style={styles.capsulelogo} />;
            case 7:
                return <Image source={blueDrop} style={styles.Profilelogo} />;
            case 8:
                return <Image source={blueDrink} style={styles.Profilelogo} />;
            case 9:
                return <Image source={yellowMed} style={styles.Profilelogo} />;
            case 10:
                return <Image source={yellowCapsule} style={styles.capsulelogo} />;
            case 11:
                return <Image source={yellowDrop} style={styles.Profilelogo} />;
            case 12:
                return <Image source={yellowDrink} style={styles.Profilelogo} />;
            case 13:
                return <Image source={redMed} style={styles.Profilelogo} />;
            case 14:
                return <Image source={redCapsule} style={styles.capsulelogo} />;
            case 15:
                return <Image source={redDrop} style={styles.Profilelogo} />;
            case 16:
                return <Image source={redDrink} style={styles.Profilelogo} />;
            case 17:
                return <Image source={{ uri: image }} style={styles.ProfileImage} />;
            case 18:
                return <Image source={{ uri: image }} style={styles.ProfileImage} />;
            default:
                return <Image source={blackMed} style={styles.Profilelogo} />;
        }
    };


    const handleCounter = () => {
        setModalVisible(true);
    }

    return (
        <>
            <View style={styles.container}>
                {showLoader && <ModalLoader />}
                <BottomModalPopup visible={modalVisible} setFreNumber={setFreNumber} setDuration={setDuration} onClose={() => setModalVisible(false)} />
                <BackHeader name={"Update Reminder"} />
                <TouchableOpacity onPress={() => navigation.navigate('MedicineImage', { selectedImageD: selectedImage, imageD: image, isUpdate: true, MedicineId: MedicineId })} style={styles.medicineContiner}>
                    {
                        selectedImage || default_icon ?
                            renderImage()
                            :
                            <Image source={MedImage ? { uri: MedImage } : blackMed} style={MedImage ? styles.ProfileImage : styles.ProfileLogo} />

                    }

                </TouchableOpacity>
                <Text style={styles.EditImage}>Edit Image</Text>
                <ScrollView ref={scrollViewRef} style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={styles.signupFormContainer}>
                        <View
                            ref={(ref) => (errorRefs.current[0] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Name of Medicine/Supplement'}
                                inputStyles={styles.inputStyles}
                                labelStyles={{ paddingHorizontal: 0 }}
                                customLabelStyles={!medicineError ? styles.customLabelStyles : styles.customLabelStylesEmpty}
                                value={MedicineName}
                                onChangeText={value => setMedicineName(value)}
                                containerStyles={!medicineError ? styles.containerStyles : styles.containerStylesEmpty}
                            />
                            {medicineError && (
                                <>
                                    <View><Text style={styles.ErrorText}>{errorMessage}</Text></View>
                                </>
                            )}
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[1] = ref)}
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Dose'}
                                inputStyles={styles.inputStyles}
                                customLabelStyles={!doseError ? styles.customLabelStyles : styles.customLabelStylesEmpty}
                                value={dose}
                                onChangeText={value => setDose(value)}
                                containerStyles={!doseError ? styles.containerStyles : styles.containerStylesEmpty}
                            />
                            {doseError && (
                                <>
                                    <View><Text style={styles.ErrorText}>{errorMessage}</Text></View>
                                </>
                            )}
                        </View>
                        <View
                            ref={(ref) => (errorRefs.current[2] = ref)}
                            style={styles.floatingLabel}>
                            <TouchableOpacity onPress={handlePressDatePicker}>
                                <View style={!dateError ? styles.containerStyles : styles.containerStylesEmpty}>
                                    {fetchDateFormat && !formattedDate && (
                                        <Text style={{ marginBottom: -10, color: config.secondaryColor }}>Start Date and Time</Text>
                                    )}
                                    {date ? (
                                        <Text style={{ marginBottom: 8, color: config.secondaryColor }}>Start Date and Time</Text>
                                    ) : (
                                        <TextInput
                                            style={{ ...styles.inputStyles, marginTop: -16, marginBottom: 10, left: 5 }}
                                            placeholder="Start Date and Time"
                                            placeholderTextColor={!dateError ? config.primaryColor : 'red'}
                                            editable={false}
                                            value={date ? formattedDate : fetchDateFormat}
                                        />
                                    )}
                                    {date && (
                                        <Text style={{ ...styles.inputStyles, marginTop: -32 }}>{formattedDate && formattedDate.length > 0 ? formattedDate : fetchDateFormat}</Text>
                                    )}

                                </View>
                                {dateError && (
                                    <>
                                        <View><Text style={styles.ErrorTextDate}>{errorMessage}</Text></View>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                        {showDatePicker && (
                            <>
                                <DateTimePicker
                                    testID="datePicker"
                                    value={date || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            </>
                        )}
                        {showTimePicker && (
                            <DateTimePicker
                                testID="timePicker"
                                value={time}
                                mode="time"
                                onChange={onChangeTime}
                            />
                        )}
                        <View style={{ flexDirection: 'row', width: '90%', }}>
                            <View
                                ref={(ref) => (errorRefs.current[5] = ref)}
                                style={{ ...styles.floatingLabelH, borderBottomWidth: 0.5, borderBottomColor: config.secondaryColor }}>
                                <FloatingLabelInput
                                    label={'Number of Days'}
                                    inputStyles={styles.inputStyles}
                                    labelStyles={{ paddingHorizontal: 0 }}
                                    customLabelStyles={!daysError ? styles.customLabelStyles : styles.customLabelStylesEmpty}
                                    value={days}
                                    onChangeText={value => setDays(value)}
                                    containerStyles={!daysError ? styles.containerStyles : styles.containerStylesEmpty}
                                    keyboardType="numeric"
                                />

                                {daysError && (
                                    <>
                                        <View><Text style={styles.ErrorTextDate}>{errorMessage}</Text></View>
                                    </>
                                )}
                            </View>

                            <View
                                ref={(ref) => (errorRefs.current[3] = ref)}
                                style={{ ...styles.floatingLabelN, borderBottomWidth: 1.5, borderBottomColor: config.secondaryColor, zIndex: 999, marginTop: 0 }}>
                                <Animated.Text
                                    style={[
                                        styles.placeholderLabel,
                                        {
                                            transform: [
                                                {
                                                    translateY: placeholderLabelAnim.interpolate({
                                                        inputRange: [0, 1.2],
                                                        outputRange: [0, -25],
                                                    }),
                                                },
                                                {
                                                    scale: placeholderLabelAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0.95, 0.9],
                                                    }),
                                                },
                                            ],
                                            // Apply margin left conditionally
                                            marginLeft: placeholderLabelAnim.interpolate({
                                                inputRange: [0, 1.5],
                                                outputRange: [0, -5],
                                            }),
                                            // Interpolate font size
                                            fontSize: placeholderLabelAnim.interpolate({
                                                inputRange: [0, 1.5],
                                                outputRange: [PixelRatio.getFontScale() * 18, PixelRatio.getFontScale() * 16],
                                            }),
                                            color: placeholderLabelAnim.interpolate({
                                                inputRange: [0, 1.5],
                                                outputRange: [config.primaryColor, config.secondaryColor],
                                            }),
                                        },
                                    ]}
                                >
                                    Days
                                </Animated.Text>

                                <DropDownPicker
                                    items={DaysArray}
                                    value={selectedDays}
                                    onSelectItem={handleSelect}
                                    placeholder=""
                                    open={isOpen}
                                    showArrowIcon={false}
                                    onOpen={handleOpen}
                                    onClose={handleOpen}
                                    listMode="SCROLLVIEW"
                                    style={{
                                        backgroundColor: styles.primaryColor,
                                        borderWidth: 0,
                                        left: -7,
                                        top: 22,
                                        color: config.primaryColor,
                                        zIndex: 999,
                                    }}
                                    textStyle={{
                                        fontSize: PixelRatio.getFontScale() * 18,
                                    }}
                                />
                            </View>
                        </View>


                        <TouchableOpacity
                            onPress={() => handleCounter()}
                            ref={(ref) => (errorRefs.current[5] = ref)}
                            style={styles.floatingLabel}>
                            {
                                freNumber &&
                                <>
                                    <View style={{ marginTop: 10, }}></View>
                                    <FloatingLabelInput
                                        label={'Frequency'}
                                        inputStyles={styles.inputStyles}
                                        customLabelStyles={styles.customLabelStyles}
                                        value={`Every ${freNumber} ${duration}`}
                                        onChangeText={value => setFrequency(value)}
                                        containerStyles={styles.containerStyles}
                                        onPressOut={() => handleCounter()}
                                    />
                                </>
                            }
                            {
                                !freNumber &&
                                <TextInput
                                    style={
                                        !freNumberError ?
                                            {
                                                ...styles.containerStyles,
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                marginBottom: 20
                                            } :
                                            {
                                                ...styles.containerStylesEmpty,
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                marginBottom: 20
                                            }

                                    }
                                    editable={false}
                                    placeholder="Frequency"
                                    placeholderTextColor={!freNumberError ? 'gray' : 'red'}
                                    onChangeText={value => setFrequency(value)} // You can remove this line
                                />
                            }

                            {freNumberError && !freNumber && (
                                <>
                                    <View><Text style={styles.ErrorTextFrequency}>{errorMessage}</Text></View>
                                </>
                            )}

                        </TouchableOpacity>

                        {freNumberError && !freNumber && (
                            <>
                                <View style={{ marginBottom: 30 }}></View>
                            </>
                        )}
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                                thumbColor={isNotify ? config.secondaryColor : config.primaryColor}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleNotifySwitch}
                                value={isNotify}
                            />
                            <Text style={styles.NotifyText}>Notifications</Text>
                        </View>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: config.primaryColor, true: '#CFB53B' }}
                                thumbColor={priority ? config.secondaryColor : config.primaryColor}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={togglePrioritySwitch}
                                value={priority}
                            />
                            <View>
                                <Text style={styles.NotifyText}>High priority</Text>
                            </View>
                        </View>
                        <View style={styles.notifyContainer}>
                            <Text style={styles.NotifyMsg}>Allow Easy Patient to make sound notifications even when you cell phone is in silent mode.</Text>
                        </View>
                        <View style={{ width: '95%', marginTop: 35 }}>
                            <CustomizedButton onPress={() => handleConfirm()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                        </View>
                        <View style={{ width: '95%', marginTop: 25, marginBottom: 50, }}>
                            <Image source={deleteIcon} style={styles.deleteIcon} />
                            <CustomizedButton onPress={() => handleDelete()} buttonColor={"white"} borderColor={"#a70000"} textColor={"#a70000"} text={"Switch off"} />
                        </View>
                    </View>
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
    ProfileImage: {
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
    deleteIcon: {
        height: 28,
        width: 24,
        marginLeft: 35,
        marginTop: 6,
        zIndex: 999,
        position: 'absolute',
    },
    ProfileLogo: {
        height: 52,
        width: 35,
    },
    medicineContiner: {
        borderRadius: 40,
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: config.secondaryColor,
        marginTop: 40,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    ErrorText: {
        color: 'red',
        marginTop: 10,
        marginBottom: -10,
        marginLeft: 0,
    },
    ErrorTextDate: {
        color: 'red',
        marginBottom: -30,
        marginLeft: 0,
    },
    ErrorTextFrequency: {
        color: 'red',
        marginBottom: -30,
        marginLeft: 0,
        top: -15,
        // marginBottom:20,
    },
    switchContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 18,
        gap: 5,
        marginTop: 15,
        alignItems: 'center',
    },
    notifyContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 70,
        gap: 20,
        marginTop: 8,
        alignItems: 'center',
    },
    Profilelogo: {
        height: 52,
        width: 35,
    },
    inputContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
        borderBottomWidth: 2,
        width: '90%',
    },
    capsulelogo: {
        height: 30,
        width: 28,
        borderColor: config.secondaryColor,
    },
    NotifyMsg: {
        color: config.secondaryColor,
        width: '90%',
        fontSize: PixelRatio.getFontScale() * 14,
    },
    placeholderLabel: {
        position: 'absolute',
        left: 0,
        top: 25,
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.primaryColor,
        zIndex: 1,
        lineHeight: PixelRatio.getFontScale() * 20,
    },
    TextContainer: {
        width: '80%',
        marginTop: 40,
    },
    TextContainerText: {
        fontSize: PixelRatio.getFontScale() * 17,
        textAlign: 'center',
        color: 'gray'
    },

    inputEmail: {
        marginBottom: -8,
        flex: 1,
        fontSize: PixelRatio.getFontScale() * 17,
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
    EditImage: {
        color: config.secondaryColor,
        textAlign: 'center',
        marginBottom: 20,
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
    NotifyText: {
        color: config.primaryColor,
        fontSize: PixelRatio.getFontScale() * 17,
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
        width: '98%',
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
        marginBottom: 10,
        width: '90%',
        height: '100%',
        flex: 1
    },
    floatingLabelH: {
        marginBottom: 6,
        width: '60%',
        height: '100%',
        flex: 0.8
    },
    floatingLabelN: {
        marginBottom: 0,
        marginStart: 20,
        width: '60%',
        height: '100%',
        flex: 0.5
    },
    containerStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        borderWidth: 0,
        height: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: config.secondaryColor,
    },
    containerStylesEmpty: {
        fontSize: PixelRatio.getFontScale() * 17,
        borderWidth: 0,
        height: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: 'red'
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
    customLabelStylesEmpty: {
        colorFocused: 'red',
        colorBlurred: 'red',
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

export default UpdateReminder;
