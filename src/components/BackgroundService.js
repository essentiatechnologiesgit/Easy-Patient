import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medicine from '../assets/medicine.png';
const BackgroundService = () => {
  BackgroundTimer.start();
  BackgroundTimer.runBackgroundTimer(async () => {
    try {
      // Your background task logic here
      const currentTime = moment().format('HH:mm');
      const AlarmsArray = JSON.parse(await AsyncStorage.getItem('Alarms'));
      if (AlarmsArray) {
        AlarmsArray.forEach(alarm => {
          const { days, times, dosage, medicine } = alarm;
          const currentTime = moment().startOf('minute');
          // const newTime = moment("2024-04-08T05:37:00.000Z");

          times.forEach(timeObj => {
            const { time } = timeObj;

            const alarmTime = moment(`${days[0]} ${time}`).startOf('minute');
            if (alarmTime.isSame(currentTime)) {
              displayNotification(dosage, medicine);
            }
          });
        });
      }

    } catch (error) {
      console.error('Background task error:', error);
    }
  }, 60000); // Run every 1 second
};

const displayNotification = async (dosage, medicine) => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'default 1',
    name: 'Default Channel 1',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: `${medicine}`,
    body: `To take ${dosage}`,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};



export default BackgroundService;
