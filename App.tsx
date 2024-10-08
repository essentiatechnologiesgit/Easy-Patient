import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native'; // Add necessary imports
import Header from './src/components/Header';
import AppNavigator from './src/navigation/AppNavigator';
import config from './config.js';
import BackgroundService from './src/components/BackgroundService';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);
const App: React.FC = () => {
  useEffect(() => {

   BackgroundService();

  }, []);
  return (
    // <Image source={config.backgroundImage} style={styles.backgroundImage}></Image>
    <View style={styles.container}>
      {config.backgroundImageType != 'svg' &&
        <ImageBackground style={styles.backgroundImage} source={config.backgroundImage}>
          {/* <Header />  */}
          <AppNavigator />
        </ImageBackground>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'stretch', // Adjust resize mode as needed (e.g., 'contain', 'stretch')
    width: '100%'

  },
});

export default App;
