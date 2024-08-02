import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, PixelRatio, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import CustomButton from './CustomizedButton';
import config from '../../config';
import { launchCamera } from 'react-native-image-picker';
import SnoozeNotify from './SnoozeNotify';
import deleteIcon from '../assets/delete.png';
import ImagePicker from 'react-native-image-crop-picker';
import cameraIcon from '../assets/camera2.png';
import galleryIcon from '../assets/gallery2.png';
import CancelledAlarm from './CancelledAlarm';
const ProfileImagePopup = ({ visible, onClose, setImage }) => {

    useEffect(() => {
    }, [onClose])

    const handleCloseModal = () => {
        onClose();
    };

    const handleImageRemove = () => {
        setImage('');
        onClose();
    }

    const handleCameraLaunch = async () => {

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
                onClose();
            }
        });
    };


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, }}
                    onPress={onClose}
                />
                <View style={styles.PopUpcontainer}>
                    <TouchableWithoutFeedback onPress={()=>openGallery()}>
                        <View style={styles.cont}>
                            <Text style={styles.text}>
                                Gallery
                            </Text>
                            <Image source={galleryIcon} style={styles.imageIcon} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.line}></View>
                    <TouchableWithoutFeedback onPress={()=>handleCameraLaunch()}>
                        <View style={styles.cont}>
                            <Text style={styles.text}>
                                Camera
                            </Text>
                            <Image source={cameraIcon} style={styles.imageIcon} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.line}></View>
                    <TouchableWithoutFeedback onPress={()=>handleImageRemove()}>
                        <View style={styles.cont}>
                            <Text style={styles.delete}>
                                Delete
                            </Text>
                            <Image source={deleteIcon} style={styles.imageIcon} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.PopUpcontainerCancel}>
                    <TouchableWithoutFeedback onPress={()=>handleCloseModal()}>
                        <View style={styles.container}>
                            <Text style={styles.Canceltext}>
                                Cancel
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({

    PopUpcontainer: {
        // padding: 20,
        borderRadius: 12,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
    },
    PopUpcontainerCancel: {
        borderRadius: 12,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: config.modalColor,
        borderRadius: 10,
        marginBottom: 10,
    },
    container: {
        alignItems: 'center',
        padding: 15,
    },
    cont: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Canceltext: {
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        color: config.textColorHeadings,
        fontWeight: '500',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'grey',
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 17,
        color: config.textColorHeadings,
        fontFamily:config.fontStyle,
    },
    delete: {
        fontSize: PixelRatio.getFontScale() * 17,
        fontFamily:config.fontStyle,
        color: 'red',
    },
    imageIcon: {
        height: 30,
        width: 30,
    },
})

export default ProfileImagePopup;
