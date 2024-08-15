import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../components/backHeader';
import CustomButton from '../components/CustomizedButton';
import gallery from '../assets/gallery.png';
import ModalLoader from '../components/ModalLoader';
import axios from 'axios';
import FormData from 'form-data';
import camera from '../assets/camera.png';
import profileIcon from '../assets/profile.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodGoldIcon from '../assets/foodGoldIcon.jpg';
const AddFoodImage = ({ route }) => {
    // const { imageURI } = route.params || { imageURI: null };
    const navigation = useNavigation();
    const [image, setImage] = useState(imageURI ? imageURI : null);
    const [showLoader, setShowLoader] = useState(false);
    
    const selectImage = () => {
        navigation.navigate("AddFoodDiary", {image:image});
    }

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
            }
        });
    };
    const handleCameraLaunch = () => {
        ImagePicker.openCamera({
            cropping: true,
        })
            .then((image) => {
                setImage(image.path);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImageRemove = () => {
        setImage('');
    }

    return (
        <View style={styles.container}>
            <BackHeader name={"New Food Diary"} />
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
            <View style={styles.medicineContiner} >
                <Image source={image ? { uri: image } : FoodGoldIcon} style={image ? styles.selectedImage : styles.Profilelogo} />
            </View>
            {
                image ?
                    <TouchableOpacity onPress={() => handleImageRemove()}>
                        <Text style={styles.turnOffText} >Remove Image</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.turnOffText} >Add Image</Text>
            }
            <View style={styles.button}>
                <CustomButton buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} onPress={() => selectImage()} />
            </View>
            {showLoader && <ModalLoader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    medicineContiner: {
        borderRadius: 45,
        width: 90,
        height: 90,
        borderWidth: 1.5,
        borderColor: config.secondaryColor,
        marginTop: 20,
        marginBottom: 12,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    Profilelogo: {
        height: 50,
        width: 50,
        alignSelf: 'center',
    },
    selectedImage: {
        height: 87,
        width: 87,
        borderRadius: 43,
        alignSelf: 'center',
    },
    turnOffText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 13,
        color: config.secondaryColor,
        fontFamily:config.fontStyle,
    },
    button: {
        marginTop: 45,
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

export default AddFoodImage;
