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
import SideBar from '../screens/SideBar';
import EditImage from '../components/EditImage';
import Practice from '../components/Practice';
import MealPlans from '../screens/MealPlans';
import Guidelines from '../screens/Guidelines';
import HealthRecommendation from '../screens/HealthRecommendation';
import Prescriptions from '../screens/Prescriptions';
import Reminders from '../screens/Reminders';
import Appointments from '../screens/Appointments';
import Configure from '../screens/Configure';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen style={styles.container} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen style={styles.container} name="Login" component={Login} />
        <Stack.Screen style={styles.container} name="Signup" component={Signup} />
        <Stack.Screen style={styles.container} name="ForgotPassword" component={ForgotPassword} /> */}
        <Stack.Screen style={styles.container} name="Dashboard" component={Dashboard} /> 
        <Stack.Screen style={styles.container} name="Profile" component={Profile} />
        <Stack.Screen style={styles.container} name="SideBar" component={SideBar} />
        <Stack.Screen style={styles.container} name="EditImage" component={EditImage} />  
        <Stack.Screen style={styles.container} name="MealPlans" component={MealPlans} />  
        <Stack.Screen style={styles.container} name="Prescriptions" component={Prescriptions} />  
        <Stack.Screen style={styles.container} name="Guidelines" component={Guidelines} />  
        <Stack.Screen style={styles.container} name="HealthRecommendation" component={HealthRecommendation} />  
        <Stack.Screen style={styles.container} name="Appointments" component={Appointments} />  
        <Stack.Screen style={styles.container} name="Reminders" component={Reminders} />  
        <Stack.Screen style={styles.container} name="Configure" component={Configure} />  
        
        {/* <Stack.Screen style={styles.container} name="Practice" component={Practice} />   */}
          
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
