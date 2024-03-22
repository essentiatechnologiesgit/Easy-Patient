import React,{useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CrossBellIcon from '../assets/crossBell.png';
import BottomModal from './BottomModal';
const CrossBell = ({ time, prescriptionText }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }

    handlePopUp = () => {
        console.warn("er");
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <View style={styles.child}>
                        <Image source={CrossBellIcon} style={styles.bell}></Image>
                        <Text style={styles.text}>{time} - Alarm </Text>
                    </View>
                    <View style={styles.reminder}><Text style={styles.text}>{prescriptionText}</Text></View>
                </View>
            </TouchableWithoutFeedback>
            <BottomModal visible={modalVisible} modalfor={"CrossBell"} onClose={() => setModalVisible(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 6,
        backgroundColor: 'white',
        width: '92%',
        height: 80,
        padding: 10,
        alignSelf: 'center',

    },
    text: {
        color: 'black',
        textAlign: 'center',
    },
    reminder: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: '96%',
        borderRadius: 3,
        backgroundColor: '#e8e8e8',
    },
    child: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 8,
        color: 'black',
    },
    bell: {
        height: 20,
        width: 20,
    }
});

export default CrossBell;
