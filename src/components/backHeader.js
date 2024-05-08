import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/leftArrow.png';

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
            <View style={name === "Reminders" ? styles.containerRem : styles.container}>
                <TouchableOpacity onPress={handleBackPress} style={styles.back}>
                    <Image source={leftArrow} style={styles.arrow}></Image>
                </TouchableOpacity>
                <Text style={name === "Reminders" ? styles.headRem : styles.head} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                {
                    name === "Reminders" ?
                        <View style={styles.button}>
                            <CircleButton title={"AddReminder"}/>
                        </View>
                        : null
                }

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 4,
        height: 66,
        width: '100%',
        alignItems: 'center',
        shadowColor: 'black',
    },
    containerRem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 4,
        height: 66,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 18,
        shadowColor: 'black',
    },
    head: {
        fontSize: PixelRatio.getFontScale() * 24,
        left: '60%',
        color: 'black',
        width:'65%',
        // backgroundColor:'red',
    },
    headRem: {
        left: -60,
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 24,
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
    button: {
        marginRight: 20,
    },
});

export default BackHeader;
