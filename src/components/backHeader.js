import React from 'react';
import { PixelRatio, StyleSheet, Text, Image, View, TouchableOpacity, Platform } from 'react-native';
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
                {
                    name !== "Reminders" && name !== "Appointments" &&
                    <TouchableOpacity onPress={handleBackPress} style={styles.back}>
                        <Image source={leftArrow} style={styles.arrow}></Image>
                    </TouchableOpacity>
                }
                <Text style={styles.head} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        elevation: 4,
        height: 66,
        width: '100%',
        // backgroundColor: config.headerColor,
        alignItems: 'center',
        shadowColor: 'black',
        ...Platform.select({
            ios: {
                marginTop: 40,
                justifyContent: 'center',
            },
            android:{
                backgroundColor: config.headerColor,
            }
        })
    },
    head: {
        fontSize: PixelRatio.getFontScale() * 24,
        fontFamily:config.fontStyle,
        color: 'black',
        ...Platform.select({
            ios: {
                textAlign:'center',
                width:'65%'
            },
            android: {
                marginLeft: '10%',
                width: '65%',
            },
        })
    },
    arrow: {
        height: 14,
        width: 14,
    },
    back: {
      
        backgroundColor: '#EEF6F8',
        padding: 7,
        borderRadius: 20,
        ...Platform.select({
            ios: {
              position:'absolute',
              left:15,  
            },
            android: {
                left: 12,
            },
        })
    },
    button: {
        marginRight: 20,
    },
});

export default BackHeader;
