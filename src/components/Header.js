import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import config from '../../config.mjs';

const Header = () => {
  return (
    <View style={[styles.header, {backgroundColor: config.primaryColor}]}>
      <Image source={config.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;
