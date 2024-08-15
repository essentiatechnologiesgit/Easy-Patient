import React from "react";
import { Button, Text, View, PixelRatio, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import config from "../../config.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function ConfirmationModal({ isVisible, toggleModal, Modalfor }) {
  const navigation = useNavigation();
  const ModalFunction = async () => {
    if (Modalfor) {
      toggleModal();
      emptyLoginResponse();
      navigation.navigate("Login");
    }
  }


  const emptyLoginResponse = async () => {
    try {
      // Get the current login response from AsyncStorage
      const loginResponseJSON = await AsyncStorage.getItem('loginResponse');
      if (loginResponseJSON) {

        await AsyncStorage.setItem('loginResponse', '');
        console.log('Login response emptied successfully.');
      } else {
        console.log('No login response found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error emptying login response:', error);
    }
  };

  getLoginResponse = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem('loginResponse');
      console.log(storedPassword);
    } catch (error) {
      console.error('Error getting password from AsyncStorage:', error);
    }
  }

  return (
    <Modal isVisible={isVisible} hasBackdrop={false} onBackdropPress={toggleModal} style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" }}>
        <Text style={{ marginBottom: 10, textAlign: 'center', color: config.textColorHeadings, fontWeight: 500, fontSize: PixelRatio.getFontScale() * 18,fontFamily:config.fontStyle, }}>Easy Patient</Text>
        <Text style={{ marginBottom: 20, textAlign: 'center', color: config.primaryColor }}>Are you sure you want to proceed?</Text>
        <View style={{ borderTopWidth: 1, borderTopColor: "lightgray", paddingTop: 10, }}>
          <TouchableWithoutFeedback onPress={ModalFunction}>
            <Text style={{ textAlign: 'center', color: config.secondaryColor }}>OK</Text>
          </TouchableWithoutFeedback>
          <View style={{ borderTopWidth: 1, borderTopColor: "lightgray", marginTop: 10 }} />
          <TouchableWithoutFeedback onPress={toggleModal}>
            <Text style={{ textAlign: 'center', color: config.secondaryColor, marginTop: 20 }}>Cancel</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmationModal;
