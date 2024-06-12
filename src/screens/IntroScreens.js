import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dots from 'react-native-dots-pagination';
import config from '../../config';
import HealthIntroScreen from '../components/HealthIntroScreen';
import CustomButton from '../components/CustomizedButton';
import CustomizedAppIntro from '../components/CustomizedAppIntro';
import BellIntro from '../components/BellIntro';
import MapsAccess from '../components/MapsAccess';

const IntroScreens = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);  // Create a reference to the ScrollView

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const page = Math.round(contentOffset.x / layoutMeasurement.width);
        setCurrentPage(page);
    };

    const handleAdvance = () => {
        if (currentPage < 3) {
            scrollViewRef.current.scrollTo({ x: (currentPage + 1) * Dimensions.get('window').width, animated: true });
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.parentContainer}>
            <ScrollView
                ref={scrollViewRef}  // Attach the reference to the ScrollView
                style={{ maxHeight: 650 }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={{ width: Dimensions.get('window').width }}>
                    <HealthIntroScreen />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <CustomizedAppIntro />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <BellIntro />
                </View>
                <View style={{ width: Dimensions.get('window').width }}>
                    <MapsAccess />
                </View>
            </ScrollView>
            <View style={{ width: '40%', alignSelf: 'center' }}>
                <CustomButton
                    onPress={handleAdvance}  // Update the onPress handler
                    buttonColor={config.secondaryColor}
                    borderColor={config.secondaryColor}
                    textColor={"white"}
                    text={currentPage !== 3 ? "Advance" : "Agree"}
                />
            </View>
            <View style={styles.dots}>
                {
                    currentPage !== 3 ?
                        <Dots
                            length={4}
                            active={currentPage}
                            activeColor={config.secondaryColor}
                            marginHorizontal={4}
                        />
                        :
                        <Text style={styles.missTrade}>Miss trade</Text>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    dots: {
        marginTop: 50,
    },
    missTrade: {
        alignSelf: 'center',
        color: config.secondaryColor,
        textDecorationLine: 'underline',
        fontSize: PixelRatio.getFontScale() * 16,
    },
});

export default IntroScreens;
