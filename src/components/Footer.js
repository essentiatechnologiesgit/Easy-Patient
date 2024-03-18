import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, PixelRatio, Animated } from 'react-native';
import more from '../assets/more.png';
import home from '../assets/home.png';
import calendar from '../assets/calendar.png';
import jar from '../assets/jar.png';
import Icon from 'react-native-vector-icons/FontAwesome';
const Footer = () => {
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const indicatorX = useRef(new Animated.Value(0)).current;
    const [activeTab, setActiveTab] = useState('');
    const moveIndicator = (index) => {
        setActiveTab(index);
        if (index !== 3) {
            let touchableWidth = 0;
            if (index === 2) {
                touchableWidth = index === 0 ? 0 : (index / 3) * 112;
            } else {
                touchableWidth = index === 0 ? 0 : (index / 3) * 100;
            }
            Animated.spring(indicatorX, {
                toValue: touchableWidth,
                useNativeDriver: false,
            }).start();
            setIndicatorPosition(touchableWidth);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => moveIndicator(0)}
                >
                    <Image source={home} style={
                        [styles.icon,
                        activeTab === 1 && styles.activeTabIcon
                        ]
                    }></Image>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => moveIndicator(1)}
                >
                    <Image source={jar} style={styles.icon}></Image>
                    <Text style={styles.text}>Reminders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => moveIndicator(2)}
                >
                    <Image source={calendar} style={styles.icon}></Image>
                    <Text style={styles.text}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => moveIndicator(3)}
                >
                    <Image source={more} style={styles.icon}></Image>
                    <Text style={styles.text}>Mails</Text>
                </TouchableOpacity>
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            transform: [
                                {
                                    translateX: Animated.multiply(indicatorX, PixelRatio.getFontScale() * 3).interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    }),
                                },
                            ],
                            width: '15%',
                        },
                    ]}
                />
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#00000033',
        elevation: 1,
        position: 'relative',
    },
    activeTabIcon:{
        // color:"#55565C",
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    icon: {
        height: 29,
        width: 29,
    },
    text: {
        fontSize: PixelRatio.getFontScale() * 14,
    },
    indicator: {
        position: 'absolute',
        height: 2,
        backgroundColor: '#707070',
        top: 0,
        left: 10,
    },
});

export default Footer;
