import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View } from 'react-native';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
const BackHeader = ({ name }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={ handleBackPress } style={styles.back}>
                    <Image source={leftArrow} style={styles.arrow}></Image>
                </TouchableOpacity>
                <Text style={styles.head}>{name}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 4,
        height: 70,
        width: '100%',
        alignItems: 'center',
        shadowColor: 'black',
    },
    head: {
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
        left: '70%',
        color: 'black',
    },
    arrow: {
        height: 20,
        width: 20,
    },
    back: {
        left: 18,
        backgroundColor: '#EAECEF',
        padding: 7,
        borderRadius: 20,
    },
});

export default BackHeader;
