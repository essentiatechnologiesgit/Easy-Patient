import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import downArrow from '../assets/downArrowBlack.png';
import shareBlack from '../assets/shareBlack.png';
import archiveBlack from '../assets/archiveBlack.png';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';

const PrescriptionDropDown = ({showDropDown,setShowDropDown}) => {
    const navigation = useNavigation();
    const handleClick= () =>{
        setShowDropDown(!showDropDown)
    }
    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>handleClick()}>
                    <View style={styles.lineContainer}>
                        <Image source={shareBlack} style={styles.share}></Image>
                        <Text style={styles.text}>Share</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>handleClick()}>
                    <View style={styles.lineContainer}>
                        <Image source={archiveBlack} style={styles.archive}></Image>
                        <Text style={styles.text}>Hide</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>handleClick()}>
                    <View style={styles.lineContainer}>
                        <Image source={downArrow} style={styles.arrow}></Image>
                        <Text style={styles.text}> Dowload</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 200,
        backgroundColor: 'white',
        right: 0,
        margin: 50,
        padding: 15,
        gap: 20,
        elevation: 6,
        // shadowColor:'black',
    },
    lineContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    share: {
        height: 20,
        width: 20,
    },
    archive: {
        height: 22,
        width: 22,
    },
    arrow: {
        left: 4,
        height: 16,
        width: 16,
    },

    text: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 20,
    },
});

export default PrescriptionDropDown;
