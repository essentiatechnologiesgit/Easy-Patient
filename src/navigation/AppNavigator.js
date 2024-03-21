import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/LoginScreen';
import { StyleSheet } from 'react-native';
import Signup from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}
        screenOptions={{
          headerShown: false, 
        }}>
        <Stack.Screen style={styles.container} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen style={styles.container} name="Login" component={Login} />
        <Stack.Screen style={styles.container} name="Signup" component={Signup} />
        <Stack.Screen style={styles.container} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen style={styles.container} name="Dashboard" component={Dashboard} />
        <Stack.Screen style={styles.container} name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
})
export default AppNavigator;
