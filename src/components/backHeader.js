import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';
import config from '../../config';
import CircleButton from '../components/CircleButton';
const BackHeader = ({ name }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        if (name == "Profile") {
            navigation.navigate('Dashboard', {
                isChanged: true,
            });
        } else if (name == "Photo") {
            navigation.navigate('Profile', {
                isChanged: true,
            });
        }
        else {
            navigation.goBack();
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleBackPress} style={styles.back}>
                    <Image source={leftArrow} style={styles.arrow}></Image>
                </TouchableOpacity>
                <Text style={styles.head} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: config.headerColor,
        elevation: 4,
        height: 66,
        width: '100%',
        alignItems: 'center',
        shadowColor: 'black',
    },
    head: {
        fontSize: PixelRatio.getFontScale() * 24,
        marginLeft: '10%',
        color: 'black',
        width:'65%',
    },
    headRem: {
        left: -60,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
        color: 'black',
        width:'65%',
    },
    arrow: {
        height: 14,
        width: 14,
    },
    back: {
        left: 12,
        backgroundColor: '#EAECEF',
        padding: 7,
        borderRadius: 20,
    },
    button: {
        marginRight: 20,
    },
});

export default BackHeader;
