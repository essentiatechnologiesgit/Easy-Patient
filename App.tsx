import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native'; // Add necessary imports
import Header from './src/components/Header';
import AppNavigator from './src/navigation/AppNavigator';
import config from './config';

const App: React.FC = () => {
  useEffect(() => {

    // Redirect to dashboard after 3 seconds
    console.log("Image:", config.backgroundImage)// Assuming you have navigation setup

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
    flex: 1, // Ensure the image covers the entire view
    resizeMode: 'stretch', // Adjust resize mode as needed (e.g., 'contain', 'stretch')
    width: '100%'

  },
});

export default App;
