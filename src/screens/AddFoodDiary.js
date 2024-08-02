import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, Switch, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import CustomizedButton from '../components/CustomizedButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import FoodGoldIcon from '../assets/foodGoldIcon.jpg';
import axios from 'axios';
import deleteIcon from '../assets/delete.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import ImageError from '../components/ImageError';
import SpinnerLoader from '../components/SpinnerLoader';
const AddFoodDiary = ({ route }) => {
    const { image, record } = route.params || { image: null };
    const [foodData, setFoodData] = useState(record);
    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState(false);
    const [titleError, settitleError] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [description, setDescription] = useState("");
    const [time, setTime] = useState(new Date());
    const [title, setTitle] = useState("");
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [access_token, setAccessToken] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [updatedDate, setUpdatedDate] = useState('');
    useEffect(() => {
        getCredentials();
        if (foodData) {
            setTitle(foodData.title);
            setDescription(foodData.description);
            setUpdatedDate(`${foodData.item_date} ${foodData.item_time}`);
        }
    }, [])
    const handlePressDatePicker = () => {
        setShowDatePicker(true);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setShowTimePicker(true);
    };
    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        const currentTime = selectedTime || time;
        setTime(currentTime);
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
    const getCredentials = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        const access_token = responseObject.access_token;
        setAccessToken(access_token);
    }
    const handleConfirm = () => {
        settitleError(false);
        setDateError(false);
        setImageError(false);
        setDescriptionError(false);
        if (!image) {
            setImageError(true);
            setTimeout(() => {
                setImageError(false);
            }, 3000);
        } else if (!title) {
            settitleError(true);
        }
        else if (!description) {
            setDescriptionError(true);
        }
        else if (!date && !updatedDate) {
            setDateError(true);
        }
        else {
            if (foodData) {
                updateData();
            } else {
                addData()
            }

        }
    }

    const updateData = () => {

        setShowLoader(true);
        let data = new FormData();
        data.append('file', {
            uri: image,
            name: 'foodImage.jpeg',
            type: 'image/jpeg'
        });
        data.append('title', title);
        data.append('description', description);
        if (date) {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
            };
            const extractTime = (time) => {
                const isoString = time.toISOString();
                return isoString.slice(11, 19);
            };
            const extractedDate = formatDate(date);
            const extractedTime = extractTime(time);
            data.append('item_date', extractedDate);
            data.append('item_time', `${extractedDate} ${extractedTime}`);
        } else {
            data.append('item_date', foodData.item_date);
            data.append('item_time', `${foodData.item_date} ${foodData.item_time}`);
        }

        data.append('id', foodData.id);


        fetch('https://api-patient-dev.easy-health.app/patient/food-item', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer 6cbcbd6075c9b953eb5621a12a414920243b1223`,
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                setShowLoader(false);
            });
    }

    const addData = () => {
        setShowLoader(true);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
        };
        const extractTime = (time) => {
            const isoString = time.toISOString();
            return isoString.slice(11, 19);
        };
        const extractedDate = formatDate(date); // "2024-05-07"
        const extractedTime = extractTime(time);
        const formData = new FormData();

        formData.append('file', {
            uri: image,
            name: 'foodImage.jpeg',
            type: 'image/jpeg'
        });
        formData.append('title', title);
        formData.append('description', description);
        formData.append('item_date', extractedDate);
        formData.append('item_time', `${extractedDate} ${extractedTime}`);

        axios.post('https://api-patient-dev.easy-health.app/patient/food-item', formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setShowLoader(false);
                navigation.navigate('FoodDiary');
            })
            ;
    }

    const handleDelete = () => {
        setShowLoader(true);
        fetch(`https://api-patient-dev.easy-health.app/patient/food-item/${foodData.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
            })
            .catch(error => {
                console.error(error);
            }).finally(()=>{
                setShowLoader(false);
                navigation.navigate("FoodDiary");
            });


    }

    return (
        <>
            <View style={styles.container}>
                {showLoader && <SpinnerLoader />}
                <BackHeader name={"New Food Diary"} />
                <TouchableOpacity style={styles.medicineContiner} onPress={() => navigation.navigate("AddFoodImage", imageURI = image)}>
                    <Image source={image ? { uri: image } : FoodGoldIcon} style={image ? styles.selectedImage : styles.ProfileLogo} />
                </TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={styles.signupFormContainer}>
                        <View
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Name'}
                                inputStyles={styles.inputStyles}
                                labelStyles={{ paddingHorizontal: 0 }}
                                customLabelStyles={!titleError ? styles.customLabelStyles : styles.customLabelStylesEmpty}
                                value={title}
                                onChangeText={value => setTitle(value)}
                                containerStyles={!titleError ? styles.containerStyles : styles.containerStylesEmpty}
                            />
                            {titleError && (
                                <>
                                    <View><Text style={styles.ErrorText}>Please add name</Text></View>
                                </>
                            )}
                        </View>
                        <View
                            style={styles.floatingLabel}>
                            <FloatingLabelInput
                                label={'Description'}
                                inputStyles={styles.inputStyles}
                                labelStyles={{ paddingHorizontal: 0 }}
                                customLabelStyles={!descriptionError ? styles.customLabelStyles : styles.customLabelStylesEmpty}
                                value={description}
                                onChangeText={value => setDescription(value)}
                                containerStyles={!descriptionError ? styles.containerStyles : styles.containerStylesEmpty}
                            />
                            {descriptionError && (
                                <>
                                    <View><Text style={styles.ErrorText}>Please add description</Text></View>
                                </>
                            )}
                        </View>
                        <View
                            style={styles.floatingLabel}>
                            <TouchableOpacity onPress={handlePressDatePicker}>
                                <View style={!dateError ? styles.containerStyles : styles.containerStylesEmpty}>
                                    {
                                        updatedDate && !date &&
                                        <Text style={{ marginBottom: -5, marginTop: 5, color: config.secondaryColor }}>Date / time</Text>
                                    }
                                    {date ? (
                                        <Text style={{ marginBottom: 8, color: config.secondaryColor }}>Date / time</Text>
                                    ) : (
                                        <TextInput
                                            style={{ ...styles.inputStyles, marginTop: -16, marginBottom: 10, left: 5 }}
                                            placeholder="Date / time"
                                            placeholderTextColor={!dateError ? config.primaryColor : 'red'}
                                            editable={false}
                                            value={date ? formattedDate : updatedDate}
                                        />
                                    )}
                                    {date && (
                                        <Text style={{ ...styles.inputStyles, marginTop: -32 }}>{formattedDate && formattedDate.length > 0 ? formattedDate : updatedDate}</Text>
                                    )}
                                </View>
                                {dateError && (
                                    <>
                                        <View><Text style={styles.ErrorTextDate}>Please add date/time</Text></View>
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

                        <View style={{ width: '95%', marginTop: 35 }}>
                            <CustomizedButton onPress={() => handleConfirm()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                        </View>
                        {
                            foodData &&
                            <View style={{ width: '95%', marginTop: 25, marginBottom: 50, }}>
                                <Image source={deleteIcon} style={styles.deleteIcon} />
                                <CustomizedButton onPress={() => handleDelete()} buttonColor={config.tertiaryColor} borderColor={"#a70000"} textColor={"#a70000"} text={"Switch off"} />
                            </View>
                        }
                    </View>
                </ScrollView>
                {
                    imageError &&
                    <ImageError />
                }
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: config.tertiaryColor,
        flex: 1,
    },
    medicineContiner: {
        borderRadius: 35,
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: config.secondaryColor,
        marginTop: 20,
        marginBottom: 12,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    selectedImage: {
        height: 68,
        width: 68,
        borderRadius: 33,
        alignSelf: 'center',
    },
    deleteIcon: {
        height: 28,
        width: 24,
        marginLeft: 35,
        marginTop: 6,
        zIndex: 999,
        position: 'absolute',
    },
    editText: {
        alignSelf: 'center',
        color: config.secondaryColor,

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
    ProfileLogo: {
        height: 35,
        width: 35,
    },
    inputContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: PixelRatio.getFontScale() * 17,
        borderBottomColor: config.secondaryColor,
        fontFamily:config.fontStyle,
        borderBottomWidth: 2,
        width: '90%',
    },
    NotifyMsg: {
        color: config.secondaryColor,
        width: '90%',
        fontSize: PixelRatio.getFontScale() * 14,
        fontFamily:config.fontStyle,
    },
    placeholderLabel: {
        position: 'absolute',
        left: 0,
        top: 25,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
        textAlign: 'center',
        color: 'gray'
    },

    inputEmail: {
        marginBottom: -8,
        flex: 1,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
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
        marginTop: 20,
    },

    FocusStyling: {
        color: config.primaryColor,
    },
    ProfileImage: {
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
    Profilelogo: {
        height: 36,
        width: 24,
        borderColor: config.secondaryColor,
    },
    capsulelogo: {
        height: 30,
        width: 28,
        borderColor: config.secondaryColor,
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
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
        // backgroundColor: 'rgba(0,0,0,0)', // Set background color directly
    },
    forgotPassword: {
        justifyContent: 'flex-end',
        textDecorationLine: 'underline',
        width: '90%',
        textAlign: 'right',
        marginTop: 20,
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
    },
    login: {
        paddingTop: '15%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 15,
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
        padding: 2,
        color: config.secondaryColor,
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    textt: {
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
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
        width: '92%',
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
        fontFamily:config.fontStyle,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: config.secondaryColor,
    },
    containerStylesEmpty: {
        fontSize: PixelRatio.getFontScale() * 17,
        borderWidth: 0,
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
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
        fontFamily:config.fontStyle,
        paddingHorizontal: 0,
        marginVertical: 0
    },
    inputStyles: {
        fontSize: PixelRatio.getFontScale() * 17,
        paddingBottom: 0,
        paddingHorizontal: 0,
        fontFamily:config.fontStyle,
        paddingTop: 30,
        color: config.textColorHeadings

    }

});

export default AddFoodDiary;
