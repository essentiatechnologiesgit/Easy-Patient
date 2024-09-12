import React, { useEffect } from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, PixelRatio } from 'react-native';
import config from '../../config.js';
import { useNavigation } from '@react-navigation/native';
import handMap from '../assets/handMap.png';
import { useTranslation } from 'react-i18next';
const MapsAccess = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>{t('routeHeading')}</Text>
            <Image source={handMap} style={styles.image} />
            <Text style={styles.text}>{t('routeParagraph')}</Text>
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
        width: 245,
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

export default MapsAccess;
