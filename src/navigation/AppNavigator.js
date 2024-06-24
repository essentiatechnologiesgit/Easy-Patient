import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/LoginScreen';
import { StyleSheet } from 'react-native';
import Signup from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import SideBar from '../screens/SideBar';
import EditImage from '../components/EditImage';
import MealPlans from '../screens/MealPlans';
import Guidelines from '../screens/Guidelines';
import PrescriptionsArchive from '../screens/PrescriptionsArchive';
import Attestations from '../screens/Attestations';
import HealthRecommendation from '../screens/HealthRecommendation';
import Prescriptions from '../screens/Prescriptions';
import Reminders from '../screens/Reminders';
import Appointments from '../screens/Appointments';
import AppointmentsDetails from '../screens/AppointmentsDetails';
import Configure from '../screens/Configure';
import AddReminder from '../screens/AddReminder';
import ChangePassword from '../screens/ChangePassword';
import TermsAndConditions from '../screens/TermsAndConditions';
import DeleteAccount from '../screens/DeleteAccount';
import UpdateReminder from '../screens/UpdateReminder';
import MealPlansArchive from '../screens/MealPlansArchive';
import ProfileAndHealth from '../screens/ProfileAndHealth';
import HealthInformation from '../screens/HealthInformation';
import ExamRequest from '../screens/ExamRequest';
import GuidelinesView from '../screens/GuidelinesView';
import MealPlansView from '../screens/MealPlansView';
import Reports from '../screens/Reports';
import ExamRequestView from '../screens/ExamRequestView.js';
import GuidelinesArchive from '../screens/GuidelinesArchive';
import BodyAssessments from '../screens/BodyAssessments';
import MedicineImage from '../screens/MedicineImage';
import AttestationsArchive from '../screens/AttestationsArchive';
import PrescriptionsView from '../screens/PrescriptionsView';
import AttestationsView from '../screens/AttestationsView';
import ReportsView from '../screens/ReportsView';
import ReportsArchive from '../screens/ReportsArchive';
import BodyAssessmentsView from '../screens/BodyAssessmentsView';
import BodyAssessmentsArchive from '../screens/BodyAssessmentsArchive';
import ExamRequestsArchive from '../screens/ExamRequestsArchive.js';
import FoodDiary from '../screens/FoodDiary.js';
import AddFoodDiary from '../screens/AddFoodDiary.js';
import AddFoodImage from '../screens/AddFoodImage.js';
import Anamnesis from '../screens/Anamnesis.js';
import AnamnesisView from '../screens/AnamnesisView.js';
import AnamnesisArchive from '../screens/AnamnesisArchive.js';
import Biometric from '../screens/Biometric.js';
import IntroScreens from '../screens/IntroScreens.js';
import PatternAuth from '../screens/PatternAuth.js';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}
        screenOptions={{
          headerShown: false,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Set sliding animation
        }}>
        {/* <Stack.Screen style={styles.container} name="Biometric" component={Biometric} /> */}
        {/* <Stack.Screen style={styles.container} name="BackgroundServices" component={BackgroundServices} />   */}
        <Stack.Screen style={styles.container} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen style={styles.container} name="IntroScreens" component={IntroScreens} />
         <Stack.Screen style={styles.container} name="Login" component={Login} />
        <Stack.Screen style={styles.container} name="PatternAuth" component={PatternAuth} />
        <Stack.Screen style={styles.container} name="Signup" component={Signup} />
        <Stack.Screen style={styles.container} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen style={styles.container} name="Dashboard" component={Dashboard} />
        <Stack.Screen style={styles.container} name="ProfileAndHealth" component={ProfileAndHealth} />
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
        <Stack.Screen style={styles.container} name="AddReminder" component={AddReminder} />
        <Stack.Screen style={styles.container} name="ChangePassword" component={ChangePassword} />
        <Stack.Screen style={styles.container} name="UpdateReminder" component={UpdateReminder} />
        <Stack.Screen style={styles.container} name="HealthInformation" component={HealthInformation} />
        <Stack.Screen style={styles.container} name="Attestations" component={Attestations} />
        <Stack.Screen style={styles.container} name="Reports" component={Reports} />
        <Stack.Screen style={styles.container} name="BodyAssessments" component={BodyAssessments} />
        <Stack.Screen style={styles.container} name="ExamRequest" component={ExamRequest} />
        <Stack.Screen style={styles.container} name="MedicineImage" component={MedicineImage} />
        <Stack.Screen style={styles.container} name="AppointmentsDetails" component={AppointmentsDetails} />
        <Stack.Screen style={styles.container} name="PrescriptionsView" component={PrescriptionsView} />
        <Stack.Screen style={styles.container} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen style={styles.container} name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen style={styles.container} name="MealPlansArchive" component={MealPlansArchive} />
        <Stack.Screen style={styles.container} name="PrescriptionsArchive" component={PrescriptionsArchive} />
        <Stack.Screen style={styles.container} name="MealPlansView" component={MealPlansView} />
        <Stack.Screen style={styles.container} name="GuidelinesArchive" component={GuidelinesArchive} />
        <Stack.Screen style={styles.container} name="GuidelinesView" component={GuidelinesView} />
        <Stack.Screen style={styles.container} name="AttestationsArchive" component={AttestationsArchive} />
        <Stack.Screen style={styles.container} name="AttestationsView" component={AttestationsView} />
        <Stack.Screen style={styles.container} name="ReportsView" component={ReportsView} />
        <Stack.Screen style={styles.container} name="ReportsArchive" component={ReportsArchive} />
        <Stack.Screen style={styles.container} name="BodyAssessmentsArchive" component={BodyAssessmentsArchive} />
        <Stack.Screen style={styles.container} name="BodyAssessmentsView" component={BodyAssessmentsView} />
        <Stack.Screen style={styles.container} name="ExamRequestsArchive" component={ExamRequestsArchive} />
        <Stack.Screen style={styles.container} name="ExamRequestView" component={ExamRequestView} />
        <Stack.Screen style={styles.container} name="FoodDiary" component={FoodDiary} />
        <Stack.Screen style={styles.container} name="AddFoodDiary" component={AddFoodDiary} />
        <Stack.Screen style={styles.container} name="AddFoodImage" component={AddFoodImage} />
        <Stack.Screen style={styles.container} name="Anamnesis" component={Anamnesis} />
        <Stack.Screen style={styles.container} name="AnamnesisView" component={AnamnesisView} />
        <Stack.Screen style={styles.container} name="AnamnesisArchive" component={AnamnesisArchive} />
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
