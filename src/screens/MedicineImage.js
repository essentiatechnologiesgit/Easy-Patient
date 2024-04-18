import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, TouchableWithoutFeedback, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import profileIcon from '../assets/profile.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import axios from 'axios';
import medicine from '../assets/medicine2.png';
import CustomButton from '../components/CustomizedButton';
import Snackbar from '../components/Snackbar';
import { launchCamera } from 'react-native-image-picker';
import camera from '../assets/camera.png';
import yellowDrop from '../assets/yellowDrop.png';
import redDrop from '../assets/redDrop.png';
import blackDrop from '../assets/blackDrop.png';
import blueDrop from '../assets/blueDrop.png';
import yellowDrink from '../assets/yellowDrink.png';
import redDrink from '../assets/redDrink.png';
import blueDrink from '../assets/blueDrink.png';
import blackDrink from '../assets/blackDrink.png';
import yellowMed from '../assets/yellowMed.png';
import blueMed from '../assets/blueMed.png';
import redMed from '../assets/redMed.png';
import blackMed from '../assets/blackMed.png';
import yellowCapsule from '../assets/yellowCapsule.png';
import blueCapsule from '../assets/blueCapsule.png';
import redCapsule from '../assets/redCapsule.png';
import blackCapsule from '../assets/blackCapsule.png';
import gallery from '../assets/gallery.png';
import ImagePicker from 'react-native-image-crop-picker';
import ModalLoader from '../components/ModalLoader';
import qs from 'qs';
import AlertIcon from '../components/AlertIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackHeader from '../components/backHeader';

const MedicineImage = ({route}) => {
    const { selectedImageD, imageD } = route.params || {};
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [image, setImage] = useState(imageD? imageD : '');
    const [selectedImage, setSelectedImage] = useState(selectedImageD ? selectedImageD : '');
    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true,
            freeStyleCropEnabled: true,
            cropperToolbarTitle: 'Edit Photo',
            cropperToolbarColor: 'white',
            cropperToolbarWidgetColor: 'black',
            cropperActiveWidgetColor: 'black',
            cropperStatusBarColor: 'white',
            cropperStatusBarContentDark: false,
            includeBase64: false,
            showCropFrame: true,
            showCropGuidelines: true
        }).then((image) => {
            if (!image.didCancel) {
                setImage(image.path);
                setSelectedImage(18);
            }
        });
    };
    const handleCameraLaunch = async () => {
        const options = {
            mediaType: 'photo',
        };
        try {
            const response = await launchCamera(options);
            console.log('pickedFile', response.assets[0].originalPath);
            setImage(response.assets[0].originalPath);
            setSelectedImage(17);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleImageSelect = (selected) => {
        setImage('');
        setSelectedImage(selected);
    }

    const handleConfirm = () => {
        navigation.navigate('AddReminder', { selectedImage,image });
    }

    const renderImage = () => {
        switch (selectedImage) {
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
                return <Image source={blackMed} style={styles.Profilelogo} />; // Return null if selectedImage is not set
        }
    };



    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"Medicine Image"} />
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.cont} onPress={openGallery}>
                        <Image source={gallery} style={styles.cameraIcon} />
                        <Text style={styles.iconText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cont} onPress={handleCameraLaunch}>
                        <Image source={camera} style={styles.galleryIcon} />
                        <Text style={styles.iconText}>Camera</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.medicineImage}>
                    {renderImage()}
                </View>
                <Text style={styles.Add}>Add</Text>
                <View style={styles.medicines}>
                    <TouchableWithoutFeedback onPress={() => { handleImageSelect(1) }}>
                        <View style={selectedImage === 1 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blackMed} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(2)}>
                        <View style={selectedImage === 2 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blackCapsule} style={styles.capsulelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(3)}>
                        <View style={selectedImage === 3 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blackDrop} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(4)}>
                        <View style={selectedImage === 4 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blackDrink} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.medicines}>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(5)}>
                        <View style={selectedImage === 5 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blueMed} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(6)}>
                        <View style={selectedImage === 6 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blueCapsule} style={styles.capsulelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(7)}>
                        <View style={selectedImage === 7 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blueDrop} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(8)}>
                        <View style={selectedImage === 8 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={blueDrink} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.medicines}>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(9)}>
                        <View style={selectedImage === 9 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={yellowMed} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(10)}>
                        <View style={selectedImage === 10 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={yellowCapsule} style={styles.capsulelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(11)}>
                        <View style={selectedImage === 11 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={yellowDrop} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(12)}>
                        <View style={selectedImage === 12 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={yellowDrink} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.medicines}>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(13)}>
                        <View style={selectedImage === 13 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={redMed} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(14)}>
                        <View style={selectedImage === 14 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={redCapsule} style={styles.capsulelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(15)}>
                        <View style={selectedImage === 15 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={redDrop} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleImageSelect(16)}>
                        <View style={selectedImage === 16 ? styles.yellowCircle : styles.blackCircle}>
                            <Image source={redDrink} style={styles.Profilelogo} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ width: '95%', position: 'absolute', marginBottom: 40, bottom: 0, }}>
                    <CustomButton onPress={() => handleConfirm()} buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} />
                </View>

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
    yellowCircle: {
        borderRadius: 30,
        height: 60,
        width: 60,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: config.secondaryColor,
    },
    blackCircle: {
        borderRadius: 30,
        height: 60,
        width: 60,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cfc9c8',
    },
    ProfileImage:{
        height:75,
        width:75,
        borderRadius:37.5,
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

    medicines: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    medicineImage: {
        borderRadius: 40,
        borderColor: config.secondaryColor,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        height: 78,
        width: 78,
        alignSelf: 'center',
    },
    Add: {
        color: config.secondaryColor,
        alignSelf: 'center',
        marginTop: 10,
    },
    turnOffText: {
        marginTop: 45,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 12,
        color: config.secondaryColor,
        textDecorationLine: 'underline',
    },
    button: {
        marginTop: 40,
        width: '90%',
        alignSelf: 'center'
    },
    cameraIcon: {
        height: 32,
        width: 35,
    },
    iconText: {
        textAlign: 'center',
        color: config.secondaryColor,
    },
    cont: {
        alignItems: 'center',
    },
    galleryIcon: {
        height: 31,
        width: 38,
    },
    iconsContainer: {
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'space-around',
    },
});

export default MedicineImage;
