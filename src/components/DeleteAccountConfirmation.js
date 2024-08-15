import React from "react";
import { Button, Text, View, PixelRatio, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import config from "../../config.mjs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function DeleteAccountConfirmation({ isVisible, toggleModal, Modalfor,Confirm }) {
  const navigation = useNavigation();


  return (
    <Modal isVisible={isVisible} hasBackdrop={true} onBackdropPress={toggleModal} style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 4, width: "90%" }}>
        <Text style={{ marginBottom: 10, color: config.textColorHeadings, fontWeight: 500, fontSize: PixelRatio.getFontScale() * 20, fontFamily:config.fontStyle,}}>Easy Patient</Text>
        <Text style={{ marginBottom: 20, color: config.primaryColor }}>All your medication data and schedules will be deleted. Are you shure you want to delete the account?</Text>
        <View style={{ paddingTop: 10, flexDirection:'row', gap:14, justifyContent:'flex-end'}}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <Text style={{ color: config.secondaryColor,fontSize: PixelRatio.getFontScale() * 16 ,fontFamily:config.fontStyle,}}>CANCEL</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Confirm}>
            <Text style={{ color: config.secondaryColor,fontSize: PixelRatio.getFontScale() * 16,fontFamily:config.fontStyle,}}>SWITCH OFF</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteAccountConfirmation;
