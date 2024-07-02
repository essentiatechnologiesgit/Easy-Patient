import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity, Platform } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomizedButton from '../components/CustomizedButton';
import ImagePicker from 'react-native-image-crop-picker';
import ValidationMessageError from '../components/ValidationMessageError';
import ValidationError from '../components/ValidationError';
import axios from 'axios';
import Snackbar from '../components/Snackbar';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';
import ProfileImagePopup from '../components/ProfileImagePopup';
const Profile = () => {
    const route = useRoute();
    const isChanged = route.params?.isChanged;
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [date, setDate] = useState("");
    const [selectedGender, setSelectedGender] = useState('');
    const errorRefs = useRef([]);
    const [IOSError, setIOSError] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarKey, setSnackbarKey] = useState(0);
    //validation feilds
    const [emailError, setEmailError] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [placeholderLabelAnim] = useState(new Animated.Value(selectedGender ? 1 : 0));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [image, setImage] = useState('');
    const [newDate , setNewDate ] = useState(new Date());
    const genders = [
        { label: 'Male', value: 'm' },
        { label: 'Female', value: 'f' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            console.log("again here");
            const access_token = await getAccessToken();
            setAccessToken(access_token);
            getUserDetails(access_token);
        };
        fetchData();
    }, [route])

    useEffect(() => {
        const fetchData = async () => {
            const access_token = await getAccessToken();
            setAccessToken(access_token);
            getUserDetails(access_token);
        };
        fetchData();
    }, []);

    const getAccessToken = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        return responseObject.access_token;
    };

    const getUserDetails = (access_token) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/patient',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };
        axios.request(config)
            .then((response) => {
                setImage(response.data.picture);
                console.log(response.data.picture);
                setEmail(response.data.username);
                setFullName(response.data.name);
                const [year, month, date] = response.data.birth_date.split("-");
                const formattedDate = `${date}/${month}/${year}`;
                setDate(formattedDate);
                if (response.data.gender == 'm')
                    handleSelect({ "label": "Male", "value": "m" })
                else {
                    handleSelect({ "label": "Female", "value": "f" })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setShowLoader(false);
            });
    }

    const handlePressDatePicker = () => {
        setShowDatePicker(true);
    };


    const handleSelect = (item) => {
        setSelectedGender(item.value);
        setIsOpen(false);
        setPlaceholderVisible(false);
        Animated.timing(placeholderLabelAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };
    const onChange = (event, selectedDate) => {
        setNewDate(selectedDate);
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        formattedDate = `${day}/${month}/${year}`;
        setDate(formattedDate);
    };

    const handleOpen = () => setIsOpen(!isOpen);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleShowSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarKey((prevKey) => prevKey + 1);
    };

    const handleConfirm = () => {
        setEmailError(false);
        setFullNameError(false);
        setDateError(false);
        setSnackbarMessage('');
        setGenderError(false);
        setDateError(false);
        setErrorMessage('');
        if (!email) {
            setEmailError(true);
            setErrorMessage("Please provide email");
        }
        else if (!validateEmail(email)) {
            setInvalidEmail(true);
            setErrorMessage("Invalid email");
        }
        else if (!fullName) {
            setFullNameError(true);
            setErrorMessage("Please provide Full Name");
        }
        else if (!date) {
            setDateError(true);
            setErrorMessage("Please provide Date");
        }
        else if (!selectedGender) {
            setSelectedGender(true);
            setErrorMessage("Please provide Gender");
        } else {
            setShowLoader(true);
            let data = qs.stringify({
                'fullname': fullName,
                'email': email,
                'date_of_birth': date,
                'gender': selectedGender
            });
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'https://api-patient-dev.easy-health.app/patient',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${accessToken}`
                },
                data: data
            };
            axios.request(config)
                .then(async (response) => {
                    await handleImageSave();
                    handleShowSnackbar("Profile Updated");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setShowLoader(false);
                });
        }
    }

    const getFileExtension = (fileUri) => {
        if (!fileUri) {
            return null;
        }
        const parts = fileUri.split('.');
        return parts.length > 1 ? parts.pop() : null;
    }

    const handleEmptyImageSave = async () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'https://api-patient-dev.easy-health.app/patient/picture',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                updateProfilePicture('');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const updateProfilePicture = async (newProfilePic) => {
        let loginResponse = await AsyncStorage.getItem('loginResponse');
        loginResponse = JSON.parse(loginResponse);
        loginResponse.user.profile_pic = newProfilePic;
        const updatedLoginResponse = JSON.stringify(loginResponse);
        // console.log(updatedLoginResponse);
        await AsyncStorage.setItem('loginResponse', updatedLoginResponse);
    };


    const handleImageSave = async () => {
        try {
            if (!image) {
                setShowLoader(false);
                handleEmptyImageSave();
                return;
            }

            const formData = new FormData();
            const fileUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
            const fileExtension = getFileExtension(fileUri) || 'jpg'; // Default extension 'jpg'
            const fileName = `image.${fileExtension}`;

            formData.append('file', {
                uri: fileUri,
                name: fileName,
                type: `image/${fileExtension}`,
            });

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            };
            const response = await axios.post('https://api-patient-dev.easy-health.app/patient/upload', formData, {
                headers: headers,
            });
            updateProfilePicture(response.data.location);
            // console.log('Image uploaded successfully:', response.data.location);

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const handlePassword = () => {
        navigation.navigate("ChangePassword");
    }

    handlePhotoNavigation = () => {
        if (Platform.OS === 'android') {
            navigation.navigate('EditImage', {
                imageURI: image,
            });
        } else {
            handleEdit()
        }
    }

    const handleEdit = () => {
        setModalVisible(true);
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <ProfileImagePopup visible={modalVisible} onClose={() => setModalVisible(false)} setImage={setImage} />
                <ValidationMessageError visible={IOSError} msg={errorMessage} setVisible={setIOSError} />
                <BackHeader name={"Profile"} />
                <View style={styles.formContainer}>
                    <TouchableOpacity onPress={() => handlePhotoNavigation()}>
                        <Image source={image ? { uri: image } : profileIcon} style={styles.Profilelogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleEdit() }}>
                        <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity>
                    <ScrollView ref={scrollViewRef} style={{ width: '94%', alignSelf: 'center' }} contentContainerStyle={{ alignItems: 'center', marginTop: 45, }}>
                        <View style={styles.signupFormContainer}>
                            <View
                                ref={(ref) => (errorRefs.current[1] = ref)}
                                style={styles.floatingLabel}>
                                <FloatingLabelInput
                                    label={'Full Name'}
                                    inputStyles={styles.inputStyles}
                                    customLabelStyles={styles.customLabelStyles}
                                    value={fullName}
                                    onChangeText={value => setFullName(value)}
                                    containerStyles={styles.containerStyles}
                                />
                                {fullNameError && !fullName && (
                                    <>
                                        <AlertIcon />
                                        <ValidationError errorMessage={errorMessage} />
                                    </>
                                )}
                            </View>
                            <View
                                ref={(ref) => (errorRefs.current[0] = ref)}
                                style={styles.floatingLabel}>
                                <FloatingLabelInput
                                    label={'E-mail'}
                                    inputStyles={styles.inputStyles}
                                    labelStyles={{ paddingHorizontal: 0 }}
                                    customLabelStyles={styles.customLabelStyles}
                                    value={email}
                                    onChangeText={value => setEmail(value)}
                                    containerStyles={styles.containerStyles}
                                />
                                {emailError && !email && (
                                    <>
                                        <AlertIcon />
                                        <ValidationError errorMessage={errorMessage} />
                                    </>
                                )}
                                {invalidEmail && (
                                    <>
                                        <AlertIcon />
                                        <ValidationError errorMessage={errorMessage} />
                                    </>
                                )}
                            </View>

                            <View
                                ref={(ref) => (errorRefs.current[2] = ref)}
                                style={styles.floatingLabel}>
                                <TouchableOpacity onPress={handlePressDatePicker}>
                                    <View style={{ ...styles.containerStyles }}>
                                        {date ? (
                                            <Text style={{ marginBottom: 8, color: config.secondaryColor }}>Date Of Birth</Text>
                                        ) : (
                                            <TextInput
                                                style={{ ...styles.inputStyles, marginTop: -16, marginBottom: 10, left: 5 }}
                                                placeholder="Date Of Birth"
                                                placeholderTextColor={config.primaryColor}
                                                editable={false}
                                                value={date}
                                            />
                                        )}
                                        {date && (
                                            <Text style={{ ...styles.inputStyles, marginTop: -32 }}>{date.toString()}</Text>
                                        )}
                                        {dateError && !date && (
                                            <>
                                                <AlertIcon />
                                                <ValidationError errorMessage={errorMessage} />
                                            </>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {showDatePicker && (
                                <>
                                    {Platform.OS === 'android' ?
                                        <DateTimePicker
                                            style={{ position: 'absolute', width: '100%', bottom: 0, backgroundColor: 'white', zIndex: 999, }}
                                            testID="dateTimePicker"
                                            value={date || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={onChange}
                                        />
                                        :
                                        <>
                                            <View style={{ height: 30, width: '100%', justifyContent: 'center', backgroundColor: '#DAE2E4', position: 'absolute', zIndex: 999, bottom: 216 }} >
                                                <TouchableOpacity onPress={() => { setShowDatePicker(false) }}>
                                                    <Text style={{ alignSelf: 'flex-end', right: 10 }}>OK</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <DateTimePicker
                                                style={{ position: 'absolute', width: '100%', bottom: 0, backgroundColor: 'white', zIndex: 999, }}
                                                testID="dateTimePicker"
                                                value={newDate}
                                                mode="date"
                                                display="spinner"
                                                onChange={onChange}
                                            />
                                        </>
                                    }
                                </>
                            )}
                            <View
                                ref={(ref) => (errorRefs.current[3] = ref)}
                                style={{ ...styles.floatingLabel, borderBottomWidth: 0.96, borderBottomColor: config.secondaryColor, zIndex: 998, marginTop: 5 }}>
                                <Animated.Text
                                    style={[
                                        styles.placeholderLabel,
                                        {
                                            transform: [
                                                {
                                                    translateY: placeholderLabelAnim.interpolate({
                                                        inputRange: [0, 1.5],
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
                                                outputRange: [0, -5], // Move the text to the left after animation
                                            }),
                                            // Interpolate font size
                                            fontSize: placeholderLabelAnim.interpolate({
                                                inputRange: [0, 1.5],
                                                outputRange: [PixelRatio.getFontScale() * 18, PixelRatio.getFontScale() * 16], // Change font size after animation
                                            }),
                                            color: placeholderLabelAnim.interpolate({
                                                inputRange: [0, 1.5],
                                                outputRange: ['gray', config.secondaryColor], // Change font color after animation
                                            }),
                                        },
                                    ]}
                                >
                                    Select Gender
                                </Animated.Text>

                                <DropDownPicker
                                    items={genders}
                                    value={selectedGender}
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
                                        top: 8,
                                        color: config.primaryColor,
                                    }}
                                    textStyle={{
                                        fontSize: PixelRatio.getFontScale() * 17,
                                        color: config.textColorHeadings,
                                    }}
                                />
                                {genderError && !selectedGender && (
                                    <>
                                        <AlertIcon />
                                        <ValidationError errorMessage={errorMessage} />
                                    </>
                                )}
                            </View>

                            <TouchableOpacity onPress={handlePassword}>
                                <Text style={styles.register}>Change Password</Text>
                            </TouchableOpacity>

                            <View style={{ width: '100%', marginTop: 40 }}>
                                <CustomizedButton onPress={handleConfirm} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                            </View>

                        </View>
                        {snackbarMessage !== '' && <Snackbar message={snackbarMessage} keyProp={snackbarKey} />}
                    </ScrollView>
                </View>
                {showLoader && <ModalLoader />}

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    Profilelogo: {
        height: 90,
        width: 90,
        alignSelf: 'center',
        borderRadius: 48,
        borderColor: config.secondaryColor,
        borderWidth: 1,
    },
    edit: {
        color: config.secondaryColor,
        textAlign: 'center',
        marginTop: 20,
        fontSize: PixelRatio.getFontScale() * 17,
        textDecorationLine: 'underline',
    },
    formContainer: {
        marginTop: '8%',
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
    register: {
        paddingTop: '7%',
        textDecorationLine: 'underline',
        color: config.secondaryColor,
        fontSize: PixelRatio.getFontScale() * 16
    },
    placeholderLabel: {
        position: 'absolute',
        left: 0,
        top: 14,
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

export default Profile;
