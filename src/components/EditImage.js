import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../components/backHeader';
import CustomButton from './CustomizedButton';
import gallery from '../assets/gallery.png';
import ModalLoader from './ModalLoader';
import axios from 'axios';
import FormData from 'form-data';
import camera from '../assets/camera.png';
import profileIcon from '../assets/profile.png';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditImage = ({ route }) => {
    const { imageURI } = route.params;
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [accessToken, setAccessToken] = useState(false);

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
    const handleCameraLaunch = async () => {
        const options = {
          mediaType:'photo',
        };
    
        try {
          const response = await launchCamera(options);
            console.log('pickedFile',response.assets[0].originalPath);
            setImage(response.assets[0].originalPath);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    //   const handleCameraLaunch = async () => {
    
      
    //     const options = {
    //       title: 'Select Image',
    //       mediaType: 'photo',
    //       cropping: true, // Enable cropping similar to gallery
    //       cropperCircleOverlay: true, // Optional: Enable circular cropping
    //       freeStyleCropEnabled: true, // Optional: Allow free-style cropping
    //       cropperToolbarTitle: 'Edit Photo',
    //       cropperToolbarColor: 'white',
    //       cropperToolbarWidgetColor: 'black',
    //       cropperActiveWidgetColor: 'black',
    //       cropperStatusBarColor: 'white',
    //       cropperStatusBarContentDark: false,
    //       includeBase64: false, // Avoid including base64 data (not needed usually)
    //       showCropFrame: true,
    //       showCropGuidelines: true,
    //     };
      
    //     try {
    //       const image = await launchCamera(options);
    //       if (!image.didCancel) {
    //         setImage(image.path); // Set the image path in your state
    //       }
    //     } catch (error) {
    //       console.error('Camera Error:', error);
    //     }
    //   };

    const updateProfilePicture = async (newProfilePic) => {
        let loginResponse = await AsyncStorage.getItem('loginResponse');
        loginResponse = JSON.parse(loginResponse);
        loginResponse.user.profile_pic = newProfilePic;
        const updatedLoginResponse = JSON.stringify(loginResponse);
        // console.log(updatedLoginResponse);
        await AsyncStorage.setItem('loginResponse', updatedLoginResponse);
    };

    const handleImageRemove = () => {
        setImage('');
        handleEmptyImageSave();
    }
    const handleEmptyImageSave = async () => {
        setShowLoader(true);
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
            }).finally(()=>{
                setShowLoader(false);
            });
    }



    const handleImageSave = async () => {
        setShowLoader(true);
        try {
            if (!image) {
                setShowLoader(false);
                navigateBack()
                console.log('No image to save.');
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
            setShowLoader(false);
            console.log('Image uploaded successfully:', response.data.location);

        } catch (error) {
            setShowLoader(false);
            console.error('Error uploading image:', error);
        }
        navigateBack()
    }
    useEffect(() => {
        setImage(imageURI);
        getAccessToken();
    }, []);

    const getAccessToken = async () => {
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        const responseObject = JSON.parse(loginResponse);
        setAccessToken(responseObject.access_token);
    }

    const navigateBack = () => {
        navigation.navigate('Profile', {
            isChanged: true,
        });
    }

    const getFileExtension = (fileUri) => {
        if (!fileUri) {
            return null;
        }
        const parts = fileUri.split('.');
        return parts.length > 1 ? parts.pop() : null;
    }

    return (
        <View style={styles.container}>
            <BackHeader name={"Photo"} />
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
            <Image source={image ? { uri: image } : profileIcon} style={styles.Profilelogo} />
            <TouchableOpacity onPress={() => handleImageRemove()}>
                <Text style={styles.turnOffText} >Turn Off Photo</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <CustomButton buttonColor={config.secondaryColor} borderColor={config.secondaryColor} textColor={"white"} text={"Confirm"} onPress={() => handleImageSave()} />
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
    Profilelogo: {
        height: 90,
        width: 90,
        alignSelf: 'center',
        borderRadius: 48,
        borderColor: config.secondaryColor,
        borderWidth: 2,
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

export default EditImage;
