import React from 'react';
import { Image, View, StyleSheet, Text, PixelRatio } from 'react-native';
import config from '../../config.js';
import HealthInfo from '../assets/healthInfo.png';
import { useTranslation } from 'react-i18next';
const HealthIntroScreen = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>{t('HealthControlIntro')}</Text>
            <Image source={HealthInfo} style={styles.image} />
            <Text style={styles.text}>
            {t('HealthIntroParagraph')} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
    },
    heading: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 25,
        fontFamily:config.fontStyle,
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center',
        marginTop: -40,
        ...Platform.select({
            ios: {
              marginTop:20,
            },
          }),

    },
    image: {
        // marginTop:100,
        width: 210,
        height: 200,

    },
    text: {
        color: config.textColorHeadings,
        width: '50%',
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 16,
        fontFamily:config.fontStyle,
    }
});

export default HealthIntroScreen;
